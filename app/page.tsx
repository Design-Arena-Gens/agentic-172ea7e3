'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setGeneratedImage(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const generatePortrait = async () => {
    if (!selectedImage) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: selectedImage }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate portrait');
      }

      setGeneratedImage(data.imageUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-amber-900 dark:text-amber-100 mb-3">
            Tạo Chân Dung Áo Dài & Hoa Dã Quỳ
          </h1>
          <p className="text-lg text-amber-800 dark:text-amber-200">
            Tải ảnh khuôn mặt lên để tạo chân dung Việt Nam nghệ thuật với hoa dã quỳ
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Upload Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-semibold text-amber-900 dark:text-amber-100 mb-4">
              1. Tải Ảnh Khuôn Mặt
            </h2>

            <div className="border-2 border-dashed border-amber-300 dark:border-amber-700 rounded-xl p-8 text-center mb-4">
              {selectedImage ? (
                <div className="space-y-4">
                  <div className="relative w-full h-64">
                    <Image
                      src={selectedImage}
                      alt="Uploaded face"
                      fill
                      className="object-contain rounded-lg"
                    />
                  </div>
                  <label className="inline-block cursor-pointer bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg transition">
                    <span>Chọn Ảnh Khác</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              ) : (
                <label className="cursor-pointer block">
                  <div className="space-y-4">
                    <svg
                      className="mx-auto h-16 w-16 text-amber-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <div className="text-amber-900 dark:text-amber-100">
                      <span className="font-semibold">Nhấn để tải ảnh lên</span>
                      <p className="text-sm mt-2 text-amber-700 dark:text-amber-300">
                        PNG, JPG, JPEG (tối đa 10MB)
                      </p>
                    </div>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            {selectedImage && (
              <button
                onClick={generatePortrait}
                disabled={loading}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-xl transition shadow-lg disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Đang tạo chân dung...
                  </span>
                ) : (
                  '🌻 Tạo Chân Dung'
                )}
              </button>
            )}
          </div>

          {/* Result Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-semibold text-amber-900 dark:text-amber-100 mb-4">
              2. Chân Dung Được Tạo
            </h2>

            <div className="border-2 border-amber-300 dark:border-amber-700 rounded-xl p-4 min-h-[400px] flex items-center justify-center bg-amber-50 dark:bg-gray-900">
              {loading ? (
                <div className="text-center">
                  <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-amber-600 mb-4"></div>
                  <p className="text-amber-700 dark:text-amber-300">Đang xử lý...</p>
                </div>
              ) : generatedImage ? (
                <div className="w-full space-y-4">
                  <div className="relative w-full h-96">
                    <Image
                      src={generatedImage}
                      alt="Generated portrait"
                      fill
                      className="object-contain rounded-lg"
                    />
                  </div>
                  <a
                    href={generatedImage}
                    download="vietnamese-portrait.png"
                    className="block w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition text-center"
                  >
                    ⬇️ Tải Xuống
                  </a>
                </div>
              ) : error ? (
                <div className="text-center text-red-600 dark:text-red-400">
                  <svg className="mx-auto h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="font-semibold mb-2">Lỗi</p>
                  <p className="text-sm">{error}</p>
                </div>
              ) : (
                <div className="text-center text-amber-600 dark:text-amber-400">
                  <svg className="mx-auto h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p>Chân dung sẽ xuất hiện ở đây</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h3 className="text-2xl font-semibold text-amber-900 dark:text-amber-100 mb-6 text-center">
            ✨ Đặc Điểm Chân Dung
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-3">🌻</div>
              <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">Hoa Dã Quỳ Rực Rỡ</h4>
              <p className="text-sm text-amber-700 dark:text-amber-300">
                Bối cảnh hoa dã quỳ vàng óng nở rộ, tạo khung cảnh mộng mơ
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">👘</div>
              <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">Áo Dài Truyền Thống</h4>
              <p className="text-sm text-amber-700 dark:text-amber-300">
                Áo dài trắng xanh thanh lịch với nón lá Việt Nam
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">📸</div>
              <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">Chất Lượng Điện Ảnh</h4>
              <p className="text-sm text-amber-700 dark:text-amber-300">
                Ánh sáng hoàng hôn, độ sâu trường ảnh, siêu chân thực
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
