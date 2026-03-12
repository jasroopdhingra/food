export default function GovBanner() {
  return (
    <div className="w-full bg-white py-2 text-center">
      <p className="text-xs tracking-[0.15em] text-gray-600 uppercase">
        <svg
          className="mr-2 inline-block h-3 w-4 align-middle"
          viewBox="0 0 60 30"
          role="img"
          aria-label="United States flag"
        >
          <rect width="60" height="30" fill="#B22234" />
          <rect y="2.3" width="60" height="2.3" fill="white" />
          <rect y="6.9" width="60" height="2.3" fill="white" />
          <rect y="11.5" width="60" height="2.3" fill="white" />
          <rect y="16.2" width="60" height="2.3" fill="white" />
          <rect y="20.8" width="60" height="2.3" fill="white" />
          <rect y="25.4" width="60" height="2.3" fill="white" />
          <rect width="24" height="16.2" fill="#3C3B6E" />
        </svg>
        An official website of the United States Government
      </p>
    </div>
  );
}
