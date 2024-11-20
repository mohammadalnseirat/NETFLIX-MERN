import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div
      className="min-h-[110vh] bg-cover bg-center flex flex-col items-center justify-center text-gray-50 "
      style={{ backgroundImage: "url('/404.png')" }}
    >
      {/* header section */}
      <header className="bg-black w-full p-4 absolute top-0 left-0">
        <Link to={"/"}>
          <img src="/netflix-logo.png" alt="image-logo" className="h-8" />
        </Link>
      </header>

      {/* header section */}
      {/* main section */}
      <main className="text-center error-page--content z-10">
        <h1 className="text-4xl md:text-7xl font-bold capitalize mb-4 gradient-text">
          Lost your way?
        </h1>
        <p className="text-xl mb-6 px-4 ">
          Sorry, the page you&apos;re looking for can&apos;t be found.
        </p>
        <Link
          to={"/"}
          className="bg-red-600 text-gray-50 px-4 py-2 font-medium capitalize rounded-md hover:bg-red-700 transition-all duration-200"
        >
          Netflix Home
        </Link>
      </main>
      {/* main section */}
    </div>
  );
};

export default NotFoundPage;
