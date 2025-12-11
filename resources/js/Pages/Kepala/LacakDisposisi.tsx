import React, { useMemo, useState } from "react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { formatDistanceToNowStrict, parseISO } from "date-fns";

// Type definitions
interface TujuanDisposisi {
  id: number;
  penerima_id: number;
  penerima_nama: string;
  status_tindak_lanjut: "Belum" | "Proses" | "Selesai";
  laporan?: string | null;
  updated_at?: string | null;
}

interface Disposisi {
  id: number;
  nomor_surat: string;
  isi_disposisi: string;
  tanggal_disposisi: string; // ISO date
  tujuan_disposisi: TujuanDisposisi[];
}

// Util: hitung status global berdasarkan aturan: jika ada 'Belum' -> Tertunda, else jika ada 'Proses' -> Sebagian Proses, else Semua Selesai
function computeGlobalStatus(tujuan: TujuanDisposisi[]) {
  const hasBelum = tujuan.some((t) => t.status_tindak_lanjut === "Belum");
  const hasProses = tujuan.some((t) => t.status_tindak_lanjut === "Proses");
  if (hasBelum) return { key: "Tertunda", color: "bg-red-100 text-red-800" };
  if (hasProses) return { key: "Sebagian Proses", color: "bg-yellow-100 text-yellow-800" };
  return { key: "Semua Selesai", color: "bg-green-100 text-green-800" };
}

export default function LacakDisposisi({ disposisis = [] as Disposisi[] }: { disposisis?: Disposisi[] }) {
  const [query, setQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"Semua" | "Semua Selesai" | "Sebagian Proses" | "Tertunda">("Semua");
  const [selected, setSelected] = useState<Disposisi | null>(null);

  const filtered = useMemo(() => {
    return disposisis
      .filter((d) => {
        if (filterStatus !== "Semua") {
          const g = computeGlobalStatus(d.tujuan_disposisi).key;
          if (g !== filterStatus) return false;
        }
        if (!query) return true;
        const q = query.toLowerCase();
        return (
          d.nomor_surat.toLowerCase().includes(q) ||
          d.isi_disposisi.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => (a.tanggal_disposisi < b.tanggal_disposisi ? 1 : -1));
  }, [disposisis, query, filterStatus]);

  // helper: ringkasan (max 80 char)
  function summary(text: string, n = 80) {
    return text.length > n ? text.slice(0, n) + "..." : text;
  }

  return (
    <Authenticated>
      <div className="p-6 max-w-7xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold">Lacak Disposisi Terkirim</h1>
            <p className="text-sm text-gray-500">Monitoring disposisi yang Anda kirim — ringkas, cepat, dan fokus.</p>
          </div>
          <div className="flex gap-2 items-center">
            <div className="relative">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari nomor surat atau instruksi..."
                className="pl-3 pr-10 py-2 border rounded-md w-72 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">🔎</div>
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="py-2 px-3 border rounded-md"
            >
              <option value="Semua">Filter: Semua</option>
              <option value="Semua Selesai">Semua Selesai</option>
              <option value="Sebagian Proses">Sebagian Proses</option>
              <option value="Tertunda">Tertunda</option>
            </select>
          </div>
        </header>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="min-w-full divide-y">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">#</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Nomor Surat</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Instruksi</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Tanggal Didelegasikan</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Status Global</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Waktu Berjalan</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filtered.map((d, idx) => {
                const g = computeGlobalStatus(d.tujuan_disposisi);
                return (
                  <tr key={d.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-700">{idx + 1}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{d.nomor_surat}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{summary(d.isi_disposisi)}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{new Date(d.tanggal_disposisi).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${g.color}`}>{g.key}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{formatDistanceToNowStrict(parseISO(d.tanggal_disposisi))} lalu</td>
                    <td className="px-6 py-4 text-sm text-right">
                      <button
                        onClick={() => setSelected(d)}
                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700"
                      >
                        Lihat Detail Pelacakan
                      </button>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-10 text-center text-gray-400">Tidak ada disposisi untuk ditampilkan.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Detail Modal */}
        {selected && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold">Detail Pelacakan — {selected.nomor_surat}</h2>
                  <p className="text-sm text-gray-500">Instruksi: {selected.isi_disposisi}</p>
                </div>
                <div>
                  <button onClick={() => setSelected(null)} className="text-gray-500 hover:text-gray-700">✖</button>
                </div>
              </div>

              <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <div className="mb-4">
                    <h3 className="font-medium">Tabel Status Penerima</h3>
                    <div className="mt-2 border rounded-md overflow-hidden">
                      <table className="min-w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-2 text-left text-xs text-gray-500">Nama Staf</th>
                            <th className="px-4 py-2 text-left text-xs text-gray-500">Status</th>
                            <th className="px-4 py-2 text-left text-xs text-gray-500">Terakhir Update</th>
                            <th className="px-4 py-2 text-right text-xs text-gray-500">Aksi</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selected.tujuan_disposisi.map((t) => (
                            <tr key={t.id} className="border-t hover:bg-gray-50">
                              <td className="px-4 py-3 text-sm">{t.penerima_nama}</td>
                              <td className="px-4 py-3 text-sm">{t.status_tindak_lanjut}</td>
                              <td className="px-4 py-3 text-sm">{t.updated_at ? new Date(t.updated_at).toLocaleString() : "-"}</td>
                              <td className="px-4 py-3 text-sm text-right">
                                {t.status_tindak_lanjut === "Selesai" ? (
                                  <a href={`#/laporan/${t.id}`} className="underline text-indigo-600">Lihat Laporan</a>
                                ) : (
                                  <span className="text-sm text-gray-400">—</span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium">Viewer Surat</h3>
                    <div className="mt-2 border rounded-md p-4 text-sm text-gray-700 h-40 overflow-auto bg-gray-50">
                      {/* TODO: replace with real viewer (embed PDF / HTML content) */}
                      <p>Konten surat asli dan instruksi lengkap akan ditampilkan di sini. (Gunakan embed PDF atau iframe bila tersedia).</p>
                    </div>
                  </div>
                </div>

                <aside className="bg-gray-50 p-4 rounded-md">
                  <h4 className="font-medium mb-2">Ringkasan</h4>
                  <p className="text-sm text-gray-700 mb-3">Nomor: {selected.nomor_surat}</p>
                  <p className="text-sm text-gray-700 mb-3">Dikirim: {new Date(selected.tanggal_disposisi).toLocaleString()}</p>
                  <div className="mt-2">
                    <h5 className="text-sm font-medium">Status Global</h5>
                    <div className="mt-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${computeGlobalStatus(selected.tujuan_disposisi).color}`}>{computeGlobalStatus(selected.tujuan_disposisi).key}</span>
                    </div>
                  </div>
                </aside>
              </section>

              <div className="mt-6 flex justify-end gap-2">
                <button onClick={() => setSelected(null)} className="px-4 py-2 border rounded-md">Tutup</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Authenticated>
  );
}

/*
Integrasi singkat (catatan):
- Di controller Laravel (mis. DisposisiController@lacak), kirim data disposisi yang dibuat oleh kepala yang login ke view Inertia:
  return Inertia::render('LacakDisposisi', [ 'disposisis' => $data ]);
- Struktur JSON disposisis harus sesuai interface Disposisi di atas.
- Untuk akses laporan per staf, buat route seperti /laporan/{tujuan_id} yang bisa dibuka dari tombol "Lihat Laporan".
- Ganti viewer surat dengan iframe/pdf-embed bila file surat tersimpan.
*/
