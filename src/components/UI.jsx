import { atom, useAtom } from "jotai";
import { useEffect, useState } from "react";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import { MdFirstPage, MdLastPage } from "react-icons/md";
import { pictures } from "/src/assets/picture/pictures.js";

export const pageAtom = atom(0);
export const pages = [
  {
    front: "book-cover",
    back: pictures[0],
  },
];
for (let i = 1; i < pictures.length - 1; i += 2) {
  pages.push({
    front: pictures[i % pictures.length],
    back: pictures[(i + 1) % pictures.length],
  });
}

pages.push({
  front: pictures[pictures.length - 1],
  back: "book-back",
});

export const UI = () => {
  const [page, setPage] = useAtom(pageAtom);
  const [inputPage, setInputPage] = useState(page);

  useEffect(() => {
    setInputPage(page);
  }, [page]);

  useEffect(() => {
    const audio = new Audio("/audios/page-flip-01a.mp3");
    audio.play();
  }, [page]);

  const totalPages = pages.length - 1;
  const goToPage = (newPage) => {
    if (newPage >= 0 && newPage <= totalPages + 1) {
      setPage(newPage);
      setInputPage(newPage);
    }
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    if (/^\d*$/.test(value)) {
      setInputPage(value ? parseInt(value) : "");
    }
  };

  const handleInputSubmit = (event) => {
    if (event.key === "Enter") {
      const validPage = Math.min(Math.max(inputPage, 0), pages.length);
      setPage(validPage);
    }
  };

  return (
      <>
        <main className="pointer-events-none select-none z-10 fixed inset-0 flex justify-between flex-col">
          <a
              className="pointer-events-auto mt-10 ml-10"
              href="https://github.com/nqk0605"
          >
            <img className="w-20" src="/images/logo.png" />
          </a>

          <div className="w-full overflow-auto pointer-events-auto flex justify-center">
            <div className="overflow-auto flex items-center gap-4 max-w-full p-10">
              {/* Nút đầu */}
              <button
                  className="border-transparent hover:border-white transition-all duration-300 px-4 py-3 rounded-full text-lg uppercase shrink-0 border bg-black/30 text-white"
                  onClick={() => goToPage(0)}
              >
                <MdFirstPage/>
              </button>

              <button
                  className="border-transparent hover:border-white transition-all duration-300 px-4 py-3 rounded-full text-lg uppercase shrink-0 border bg-black/30 text-white"
                  onClick={() => goToPage(page - 1)}
                  disabled={page === 0}
              >
                <IoIosArrowRoundBack/>
              </button>

              <input
                  type="number"
                  value={inputPage}
                  onChange={handleInputChange}
                  onKeyDown={handleInputSubmit}
                  className="w-24 h-12 text-center border border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none transition-all duration-300 px-2"
                  min="0"
                  max={pages.length}
                  placeholder="Page"
              />

              <button
                  className="border-transparent hover:border-white transition-all duration-300 px-4 py-3 rounded-full text-lg uppercase shrink-0 border bg-black/30 text-white"
                  onClick={() => goToPage(page + 1)}
                  disabled={page === totalPages + 1}
              >
                <IoIosArrowRoundForward/>
              </button>

              <button
                  className="border-transparent hover:border-white transition-all duration-300 px-4 py-3 rounded-full text-lg uppercase shrink-0 border bg-black/30 text-white"
                  onClick={() => goToPage(totalPages + 1)}
              >
                <MdLastPage/>
              </button>
            </div>
          </div>
        </main>
      </>
  );
};
