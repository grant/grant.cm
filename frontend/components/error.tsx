export default function Error({
  errorMessage,
  errorCode,
}: {
  errorMessage: string;
  errorCode: string;
}) {
  return (
    <div className="block w-full h-full bg-red text-white">
      <div className="absolute left-1/2 top-1/2 w-[600px] h-[400px] -ml-[300px] -mt-[200px]">
        <span className="absolute -left-[70px] -top-[50px] text-xhuge text-red-light">
          &ldquo;
        </span>
        <h1 className="leading-[100%] pb-[30px] text-xxlarge">
          {errorMessage}
        </h1>
        <h3 className="text-large text-red-dark pb-[60px]">{errorCode}</h3>
        <hr className="w-[56%] ml-0 border-0 border-t border-red-dark pb-[10px]" />
        <h3>
          <a
            className="text-inherit italic transition-[border-bottom-color] duration-normal border-b-2 border-transparent pb-[2px] no-underline hover:border-b-2 hover:border-white"
            href="/"
          >
            Go home
          </a>
        </h3>
      </div>
    </div>
  );
}
