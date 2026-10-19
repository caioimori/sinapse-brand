"""Finite asset/document export, run under the shared resource gate."""
from pathlib import Path
import subprocess,sys
R=Path(__file__).resolve().parents[1]
for args in [[sys.executable,'-X','utf8','scripts/build-si-v9-social.py'],['node','scripts/render-si-v9-social.mjs'],[sys.executable,'-X','utf8','scripts/build-si-v9-book.py']]:subprocess.run(args,cwd=R,check=True)
for name in ['components/si-v2/visual-book.tsx','components/si-v2/book-reader.tsx','components/si-v2/chapters.tsx','components/si-v2/home.tsx','components/si-v2/shell.tsx']:
    p=R/name;s=p.read_text(encoding='utf8').replace('Brandbook-07.pdf','Brandbook-08.pdf').replace('Kit-07.zip','Kit-08.zip').replace('Brandbook 07','Brandbook 08').replace('Kit edição 07','Kit edição 08').replace('EDIÇÃO 07','EDIÇÃO 08').replace('Edição 07','Edição 08').replace('/book-v8/','/book-v9/').replace("@/data/si/book-v8.json","@/data/si/book-v9.json")
    p.write_text(s,encoding='utf8',newline='\n')
subprocess.run(['node','node_modules/typescript/bin/tsc','--noEmit'],cwd=R,check=True)
