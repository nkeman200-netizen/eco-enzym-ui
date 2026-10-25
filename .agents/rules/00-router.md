---
forge_version: "1.3.3"
forged_at: "2026-10-25"
project_name: "Eco-Enzyme Jeruklegi Landing Page"
---
# KONSTITUSI SISTEM PENGEMBANGAN AI (GOOGLE ANTIGRAVITY)
# DOMAIN: Eco-Enzyme Jeruklegi Landing Page

Dokumen ini adalah hukum utama sistem bagi Agen AI di repositori ini. AI wajib mematuhi seluruh aturan di bawah ini secara pasif dan aktif pada setiap sesi percakapan.

Dokumen Konstitusi Resmi yang saling mengikat:
1. `.agents/rules/MASTER_RULES.md` (Hukum Arsitektur, Gating System, & Output Format)
2. `.agents/rules/ARCHITECTURE.md` (Fakta DNA & Keputusan Arsitektur Kunci)
3. `.agents/rules/GIT_WORKFLOW.md` (Hukum Version Control, Branch Isolasi, & SOP Kolaborasi Tim)
4. `.agents/rules/META_RULES.md` (Kendali Kognitif, State-Machine Deterministik, & Tool-First Audit)

---

## 🚨 BACA INI SEBELUM BERTINDAK (ROUTER KONSTITUSI)

Dokumen ini adalah **Router Induk**. Demi efisiensi jendela konteks dan mencegah *Attention Dilution*, seluruh SOP prosedural (seperti cara melakukan `/edeate`, `/grill-me`, `/plan`, `/tdd`, `/execute`, `/audit`, `/debug`, dan manajemen Epik) telah **DIPINDAHKAN** ke dalam sistem *Skills* di direktori `.agents/skills/`.

**ATURAN WAJIB (ALWAYS-ON):**
1. **DILARANG BERASUMSI PROSEDUR:** Jika pengguna memanggil slash command (misal `/edeate`, `/grill-me`, `/plan`, `/tdd`, `/execute`, `/audit`, `/debug`), kamu **WAJIB** membaca dan menaati berkas *Skill* yang bersesuaian di `.agents/skills/` sebelum menjawab. Dilarang mengarang prosedur sendiri.
2. **BACA DOKUMEN ARSITEKTUR:** Jika kamu ditugaskan untuk menyentuh Core, State, Routing, Middleware, atau Database, pastikan kamu selalu merujuk pada `.agents/rules/ARCHITECTURE.md` dan `.agents/rules/MASTER_RULES.md`.
3. **ANTI YES-MAN & DEVIL'S ADVOCATE:** Jangan pernah menyetujui ide yang cacat secara arsitektur hanya demi menyenangkan pengguna. Sajikan peringatan kritis yang logis dan objektif beserta *trade-off*-nya.
4. **OTOMASI MCP (DENGAN KONSENSUS):** Bersikaplah proaktif menawarkan bantuan otomasi menggunakan tool MCP (seperti `github`, `database`, `filesystem`) untuk meringankan beban kognitif pengguna. Namun, AI **DILARANG KERAS** mengeksekusi aksi mutasi eksternal (seperti membuat Issue, commit, atau membuat PR) secara sepihak tanpa meminta izin atau konfirmasi eksplisit dari pengguna terlebih dahulu.
