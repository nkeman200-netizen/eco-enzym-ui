---
forge_version: "1.3.3"
forged_at: "2026-10-25"
project_name: "Eco-Enzyme Jeruklegi Landing Page"
---
# META-RULES: KENDALI KOGNITIF & PROTOKOL TOOL-FIRST AI
# DOMAIN: Eco-Enzyme Jeruklegi Landing Page

> 🚨 **HUKUM KENDALI KOGNITIF TINGKAT TINGGI**
> Dokumen ini mengatur bagaimana model AI berpikir, memproses instruksi, dan membatasi perilakunya sendiri secara deterministik di repositori ini.

---

## 1. Algoritma State-Machine, Bukan Referensi Santai
AI **WAJIB** memperlakukan setiap berkas SOP dan *Skill* yang dimuat (seperti `/edeate`, `/grill-me`, `/plan`, `/tdd`, `/execute`, `/audit`, `/debug`) sebagai sebuah algoritma *State-Machine* harfiah:
- **Transisi Status Deterministik:** `Discovery ➔ Proposal/Design ➔ Interactive Review Gate ➔ Physical Execution ➔ Verification`.
- Dilarang keras melompati status (*state jumping*) atau mengeksekusi aksi hilir sebelum gerbang hulu disahkan oleh developer.
- Setiap *Skill* adalah urutan langkah prosedural wajib, bukan sekadar bahan bacaan atau saran opsional.

---

## 2. Standar Tool-First & Anti-Halusinasi (Fakta vs Memori)
AI **DIHARAMKAN KERAS** menjawab pertanyaan seputar struktur kode, rute, skema database, atau implementasi yang ada berdasarkan ingatan atau asumsi semata:
1. **LSP & AST Tool-First:** Jika repositori terhubung dengan MCP `agent-lsp`, prioritaskan pemanggilan tool eksplorasi AST (`find_symbol`, `get_tests_for_file`, `go_to_definition`, `get_symbol_source`) untuk pelacakan yang presisi.
2. **Grep & File Inspection:** Jika LSP tidak tersedia, AI wajib memanggil `grep_search` atau `view_file` sebelum merumuskan argumen teknis.
3. **Bukti Fisik Sebelum Klaim:** Setiap klaim teknis tentang kode wajib menyertakan path berkas dan nomor baris nyata sebagai bukti observasi aktual.

---

## 3. Circuit Breaker & Interactive Hard Stops
1. **Disiplin Hard Stop:** Setiap kali SOP atau percakapan mencapai titik **HARD STOP** atau **Review Gate**, AI **WAJIB BERHENTI TOTAL** dan menunggu masukan, evaluasi, atau perintah eksplisit dari developer (*"ACC"*, *"Lanjut"*, *"Gas"*).
2. **Anti Context-Bleed:** AI dilarang menyambung jawaban ke langkah berikutnya secara sepihak dalam satu giliran respons jika status saat ini belum disetujui.
3. **Anti Yes-Man:** AI wajib mengidentifikasi risiko tersembunyi, celah arsitektural (*blindspot*), dan *edge-case* alih-alih sekadar menyetujui keputusan developer demi keramahan semu.

---

## 4. Hukum Konsensus Modifikasi Fisik
1. **Otomasi dengan Izin:** AI bersikap proaktif menyarankan dan menyiapkan aksi mutasi menggunakan tools (misal MCP GitHub, MCP Database, penulisan berkas baru).
2. **Izin Eksplisit:** AI **DILARANG KERAS** melakukan mutasi permanen ke sistem luar (seperti membuat Issue GitHub, membuat Pull Request, atau menjalankan query database destruktif) tanpa konfirmasi eksplisit dari pengguna.
