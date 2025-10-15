import os
from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
from dotenv import load_dotenv

load_dotenv()


def create_app() -> Flask:
    app = Flask(__name__)
    CORS(app, origins=[os.getenv("CORS_ORIGIN", "http://localhost:5173"), "https://www.djstrinity.in"])

    # Support both configured API prefix and root-level routes to match frontend
    configured_prefix = os.getenv("API_PREFIX", "/api")
    prefixes = [configured_prefix] if configured_prefix in ("", "/") else [configured_prefix, ""]

    def health_check():
        return jsonify({"status": "ok"})

    def get_leaderboard():
      
        supabase_url = os.getenv("SUPABASE_URL")
        supabase_key = os.getenv("SUPABASE_SERVICE_ROLE_KEY") or os.getenv("SUPABASE_ANON_KEY")
        table = os.getenv("SUPABASE_LEADERBOARD_TABLE", "scores")
        select_cols = os.getenv("SUPABASE_SELECT", "*")
        order_by = os.getenv("SUPABASE_ORDER_BY")  # e.g., "points.desc"
        max_rows = os.getenv("SUPABASE_MAX_ROWS")

        if not supabase_url or not supabase_key:
            return jsonify({"error": "Supabase credentials not configured"}), 500

        rest_url = f"{supabase_url.rstrip('/')}/rest/v1/{table}"
        params = {"select": select_cols}
        if order_by:
            params["order"] = order_by
        if max_rows:
            params["limit"] = max_rows

        headers = {
            "apikey": supabase_key,
            "Authorization": f"Bearer {supabase_key}",
            "Accept": "application/json",
        }

        try:
            resp = requests.get(rest_url, headers=headers, params=params, timeout=15)
            resp.raise_for_status()
            data = resp.json()
            return jsonify({"data": data})
        except requests.HTTPError as http_err:
            return (
                jsonify({"error": "Supabase request failed", "details": str(http_err), "body": resp.text}),
                resp.status_code if 'resp' in locals() else 500,
            )
        except Exception as e:
            return jsonify({"error": "Unexpected error", "details": str(e)}), 500

    def get_scores():
        """Return a simple mapping of team name -> score for AdminDashboard."""
        supabase_url = os.getenv("SUPABASE_URL")
        supabase_key = os.getenv("SUPABASE_SERVICE_ROLE_KEY") or os.getenv("SUPABASE_ANON_KEY")
        table = os.getenv("SUPABASE_LEADERBOARD_TABLE", "leaderboard")
        select_cols = "teamname,score"
        order_by = os.getenv("SUPABASE_ORDER_BY")  # e.g., "score.desc"
        max_rows = os.getenv("SUPABASE_MAX_ROWS")

        if not supabase_url or not supabase_key:
            return jsonify({"error": "Supabase credentials not configured"}), 500

        rest_url = f"{supabase_url.rstrip('/')}/rest/v1/{table}"
        params = {"select": select_cols}
        if order_by:
            params["order"] = order_by
        if max_rows:
            params["limit"] = max_rows

        headers = {
            "apikey": supabase_key,
            "Authorization": f"Bearer {supabase_key}",
            "Accept": "application/json",
        }

        try:
            resp = requests.get(rest_url, headers=headers, params=params, timeout=15)
            resp.raise_for_status()
            rows = resp.json() or []
            # Build simple mapping expected by the frontend
            mapping = {str(r.get("teamname")): r.get("score", 0) for r in rows if r.get("teamname") is not None}
            return jsonify(mapping)
        except requests.HTTPError as http_err:
            return (
                jsonify({"error": "Supabase request failed", "details": str(http_err), "body": resp.text}),
                resp.status_code if 'resp' in locals() else 500,
            )
        except Exception as e:
            return jsonify({"error": "Unexpected error", "details": str(e)}), 500

    def update_score():
        """Upsert a team's score into Supabase and return updated mapping."""
        supabase_url = os.getenv("SUPABASE_URL")
        supabase_key = os.getenv("SUPABASE_SERVICE_ROLE_KEY") or os.getenv("SUPABASE_ANON_KEY")
        table = os.getenv("SUPABASE_LEADERBOARD_TABLE", "leaderboard")

        if not supabase_url or not supabase_key:
            return jsonify({"error": "Supabase credentials not configured"}), 500

        payload = request.get_json(silent=True) or {}
        name = payload.get("name")
        score = payload.get("score")
        if not name or score is None:
            return jsonify({"error": "'name' and 'score' are required"}), 400

        rest_url = f"{supabase_url.rstrip('/')}/rest/v1/{table}"
        headers = {
            "apikey": supabase_key,
            "Authorization": f"Bearer {supabase_key}",
            "Accept": "application/json",
            "Content-Type": "application/json",
            # Use upsert to avoid duplicates if unique constraint on name exists
            "Prefer": "resolution=merge-duplicates,return=representation",
        }

        try:
            # 1) Check if a row exists for this teamname
            query_params = {"select": "id,teamname,score", "teamname": f"eq.{name}", "limit": 1}
            get_resp = requests.get(rest_url, headers={
                "apikey": supabase_key,
                "Authorization": f"Bearer {supabase_key}",
                "Accept": "application/json",
            }, params=query_params, timeout=15)
            get_resp.raise_for_status()
            existing = get_resp.json() or []

            if existing:
                # 2) Update existing row(s) by teamname
                patch_resp = requests.patch(
                    rest_url,
                    headers={
                        "apikey": supabase_key,
                        "Authorization": f"Bearer {supabase_key}",
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Prefer": "return=representation",
                    },
                    params={"teamname": f"eq.{name}"},
                    json={"score": score},
                    timeout=15,
                )
                if not (200 <= patch_resp.status_code < 300):
                    return (
                        jsonify({"error": "Failed to update score", "status": patch_resp.status_code, "body": safe_json(patch_resp)}),
                        502,
                    )
            else:
                # 3) Insert a new row
                post_resp = requests.post(rest_url, headers=headers, json=[{"teamname": name, "score": score}], timeout=15)
                if not (200 <= post_resp.status_code < 300):
                    return (
                        jsonify({"error": "Failed to insert score", "status": post_resp.status_code, "body": safe_json(post_resp)}),
                        502,
                    )

            # Fetch fresh mapping for client
            scores_resp = get_scores()
            if isinstance(scores_resp, tuple):
                body, status = scores_resp
                return jsonify({"message": "Score updated", "scores": body.get_json()}), status
            else:
                return jsonify({"message": "Score updated", "scores": scores_resp.get_json()}), 200
        except Exception as e:
            return jsonify({"error": "Unexpected error", "details": str(e)}), 500

    def register():
      
        webhook_url = os.getenv("GOOGLE_APPS_SCRIPT_WEBAPP_URL")
        if not webhook_url:
            return jsonify({"error": "Google Apps Script Web App URL not configured"}), 500

        try:
            payload = request.get_json(silent=True) or {}
            headers = {"Content-Type": "application/json"}
            resp = requests.post(webhook_url, json=payload, headers=headers, timeout=15)
            ok = 200 <= resp.status_code < 300
            return (
                jsonify({"ok": ok, "status": resp.status_code, "response": safe_json(resp)}),
                200 if ok else 502,
            )
        except Exception as e:
            return jsonify({"error": "Registration forwarding failed", "details": str(e)}), 500

    # -------------------- Admin Login --------------------
    def admin_login():
        payload = request.get_json(silent=True) or {}
        provided_id = str(payload.get("id", "")).strip()
        provided_pass = str(payload.get("password", ""))

        # Expected credentials can be configured via env; sensible defaults for local/dev
        expected_id =  "admin"
        expected_pass =  "naughty"

        if provided_id == expected_id and provided_pass == expected_pass:
            return jsonify({"ok": True})
        return jsonify({"ok": False, "error": "Invalid ID or password"}), 401

    # -------------------- Announcements --------------------
    def list_announcements():
        supabase_url = os.getenv("SUPABASE_URL")
        supabase_key = os.getenv("SUPABASE_SERVICE_ROLE_KEY") or os.getenv("SUPABASE_ANON_KEY")
        table = os.getenv("SUPABASE_ANNOUNCEMENTS_TABLE", "announcements")
        if not supabase_url or not supabase_key:
            return jsonify({"error": "Supabase credentials not configured"}), 500

        rest_url = f"{supabase_url.rstrip('/')}/rest/v1/{table}"
        params = {
            "select": "id,title,description,date,time,created_at",
            "order": "created_at.desc",
        }
        headers = {
            "apikey": supabase_key,
            "Authorization": f"Bearer {supabase_key}",
            "Accept": "application/json",
        }
        try:
            resp = requests.get(rest_url, headers=headers, params=params, timeout=15)
            resp.raise_for_status()
            return jsonify(resp.json() or [])
        except requests.HTTPError as http_err:
            return (
                jsonify({"error": "Supabase request failed", "details": str(http_err), "body": resp.text}),
                resp.status_code if 'resp' in locals() else 500,
            )
        except Exception as e:
            return jsonify({"error": "Unexpected error", "details": str(e)}), 500

    def create_announcement():
        supabase_url = os.getenv("SUPABASE_URL")
        supabase_key = os.getenv("SUPABASE_SERVICE_ROLE_KEY") or os.getenv("SUPABASE_ANON_KEY")
        table = os.getenv("SUPABASE_ANNOUNCEMENTS_TABLE", "announcements")
        if not supabase_url or not supabase_key:
            return jsonify({"error": "Supabase credentials not configured"}), 500

        payload = request.get_json(silent=True) or {}
        title = payload.get("title", "").strip()
        description = payload.get("description", "").strip()
        date = payload.get("date", "").strip()
        time_val = payload.get("time", "").strip()
        if not title:
            return jsonify({"error": "'title' is required"}), 400

        rest_url = f"{supabase_url.rstrip('/')}/rest/v1/{table}"
        headers = {
            "apikey": supabase_key,
            "Authorization": f"Bearer {supabase_key}",
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Prefer": "return=representation",
        }
        try:
            resp = requests.post(
                rest_url,
                headers=headers,
                json=[{"title": title, "description": description, "date": date, "time": time_val}],
                timeout=15,
            )
            if not (200 <= resp.status_code < 300):
                return (
                    jsonify({"error": "Failed to create announcement", "status": resp.status_code, "body": safe_json(resp)}),
                    502,
                )
            return jsonify({"message": "Created", "announcement": safe_json(resp)}), 201
        except Exception as e:
            return jsonify({"error": "Unexpected error", "details": str(e)}), 500

    def update_announcement(id: int):
        supabase_url = os.getenv("SUPABASE_URL")
        supabase_key = os.getenv("SUPABASE_SERVICE_ROLE_KEY") or os.getenv("SUPABASE_ANON_KEY")
        table = os.getenv("SUPABASE_ANNOUNCEMENTS_TABLE", "announcements")
        if not supabase_url or not supabase_key:
            return jsonify({"error": "Supabase credentials not configured"}), 500

        payload = request.get_json(silent=True) or {}
        # Only allow specific fields
        allowed = {k: v for k, v in payload.items() if k in ("title", "description", "date", "time")}
        if not allowed:
            return jsonify({"error": "No valid fields to update"}), 400

        rest_url = f"{supabase_url.rstrip('/')}/rest/v1/{table}"
        headers = {
            "apikey": supabase_key,
            "Authorization": f"Bearer {supabase_key}",
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Prefer": "return=representation",
        }
        try:
            resp = requests.patch(
                rest_url,
                headers=headers,
                params={"id": f"eq.{id}"},
                json=allowed,
                timeout=15,
            )
            if not (200 <= resp.status_code < 300):
                return (
                    jsonify({"error": "Failed to update announcement", "status": resp.status_code, "body": safe_json(resp)}),
                    502,
                )
            return jsonify({"message": "Updated", "announcement": safe_json(resp)}), 200
        except Exception as e:
            return jsonify({"error": "Unexpected error", "details": str(e)}), 500

    def delete_announcement(id: int):
        supabase_url = os.getenv("SUPABASE_URL")
        supabase_key = os.getenv("SUPABASE_SERVICE_ROLE_KEY") or os.getenv("SUPABASE_ANON_KEY")
        table = os.getenv("SUPABASE_ANNOUNCEMENTS_TABLE", "announcements")
        if not supabase_url or not supabase_key:
            return jsonify({"error": "Supabase credentials not configured"}), 500

        rest_url = f"{supabase_url.rstrip('/')}/rest/v1/{table}"
        headers = {
            "apikey": supabase_key,
            "Authorization": f"Bearer {supabase_key}",
            "Accept": "application/json",
        }
        try:
            resp = requests.delete(
                rest_url,
                headers=headers,
                params={"id": f"eq.{id}"},
                timeout=15,
            )
            if not (200 <= resp.status_code < 300):
                return (
                    jsonify({"error": "Failed to delete announcement", "status": resp.status_code, "body": safe_json(resp)}),
                    502,
                )
            return jsonify({"message": "Deleted"}), 200
        except Exception as e:
            return jsonify({"error": "Unexpected error", "details": str(e)}), 500

    # Register routes for both prefixed and root paths
    for p in prefixes:
        base = p.rstrip("/")
        base = base if base else ""

        app.add_url_rule(f"{base}/health", view_func=health_check, methods=["GET"])
        app.add_url_rule(f"{base}/leaderboard", view_func=get_leaderboard, methods=["GET"])
        app.add_url_rule(f"{base}/register", view_func=register, methods=["POST"])
        # Admin login
        app.add_url_rule(f"{base}/admin/login", view_func=admin_login, methods=["POST"])
        # Admin dashboard compatibility endpoints
        app.add_url_rule(f"{base}/scores", view_func=get_scores, methods=["GET"])
        app.add_url_rule(f"{base}/update-score", view_func=update_score, methods=["POST"])
        # Announcements
        app.add_url_rule(f"{base}/announcements", view_func=list_announcements, methods=["GET"])
        app.add_url_rule(f"{base}/announcements", view_func=create_announcement, methods=["POST"])
        app.add_url_rule(f"{base}/announcements/<int:id>", view_func=update_announcement, methods=["PATCH"])
        app.add_url_rule(f"{base}/announcements/<int:id>", view_func=delete_announcement, methods=["DELETE"])

    return app


def safe_json(resp: requests.Response):
    try:
        return resp.json()
    except Exception:
        return resp.text


app = create_app()

if __name__ == "__main__":
    port = int(os.getenv("PORT", "5000"))
    app.run(host="0.0.0.0", port=port, debug=True)


