const Footer = () => {
  return (
    <footer className="py-6 md:px-8 md:py-0 bg-black text-gray-50 border-t border-t-red-500">
      <div className="flex  flex-col md:flex-row items-center justify-between gap-4 md:h-24">
        <p className="text-balance  text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built By{" "}
          <a
            href="https://github.com/mohammadalnseirat"
            target="`_blank"
            className="font-medium gradient-text border-b border-b-red-500"
          >
            Mohamed Alnseirat
          </a>
          . The source code is available on{" "}
          <a
            href="https://github.com/mohammadalnseirat/netflix-clone"
            target="_blank"
            className="font-medium gradient-text border-b border-b-red-500"
          >
            GitHub
          </a>
        </p>
        <p className="italic">
          Copyright ©{" "}
          <span className="gradient-text">{new Date().getFullYear()}</span>{" "}
          Netflix, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
