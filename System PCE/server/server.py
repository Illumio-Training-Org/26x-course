#!/usr/bin/env python3
"""Web server for ! 26.x System PCE (runs on cloud-client).

Serves the four tab pages (index/linux/windows/aix.html) from ROOT and
accepts POST /api/state from the page with the list of paired workloads,
a summary of the policies, and the labels, label groups and services, saved to STATE for the check scripts.
"""
import http.server
import json
import os

ROOT = os.environ.get('PCE_LAB_ROOT', '/var/www/pce-lab')
STATE = os.environ.get('PCE_LAB_STATE', '/root/pce-lab-state.json')
PORT = int(os.environ.get('PCE_LAB_PORT', '8080'))
VALID = ('linux', 'windows', 'aix')


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')
        super().end_headers()

    def do_POST(self):
        if self.path != '/api/state':
            self.send_error(404)
            return
        length = int(self.headers.get('Content-Length') or 0)
        if length > 200000:
            self.send_error(413)
            return
        try:
            data = json.loads(self.rfile.read(length) or b'{}')
            paired = sorted({w for w in data.get('workloads', []) if w in VALID})
            policies = data.get('policies', [])
            if not isinstance(policies, list):
                policies = []
            objects = {}
            for k in ('labels', 'labelGroups', 'services'):
                v = data.get(k, [])
                objects[k] = v[:500] if isinstance(v, list) else []
        except (ValueError, AttributeError, TypeError):
            self.send_error(400)
            return
        tmp = STATE + '.tmp'
        with open(tmp, 'w') as f:
            json.dump(dict({'workloads': paired, 'policies': policies[:100]}, **objects), f)
        os.replace(tmp, STATE)
        self.send_response(204)
        self.end_headers()


http.server.ThreadingHTTPServer(('', PORT), Handler).serve_forever()
