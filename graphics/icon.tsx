const css = `
  html[data-theme="dark"] path, html[data-theme="dark"] circle {
    color: #fff;
  }

  path, circle {
    color: #000;
  }

  .graphic-icon {
    width: 50px;
    height: 50px;
  }
`;

export const Icon = () => {
  return (
    <svg
      viewBox="0 0 62 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="graphic-icon"
    >
      <style>{css}</style>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M31.0068 9.42017H10.1151V50.8237H31.0068H51.8986V9.42017H31.0068ZM31.0068 50.5568C19.6399 50.5568 10.3827 41.3654 10.3827 30.1144C10.3827 18.8634 19.6399 9.68713 31.0068 9.68713C42.3586 9.68713 51.631 18.8634 51.631 30.1144C51.631 41.3654 42.3586 50.5568 31.0068 50.5568Z"
        fill="currentColor"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M31.0069 0.244141H0.858002V60H31.0069H61.1558V0.244141H31.0069ZM31.0069 59.5957C14.6253 59.5957 1.24786 46.3539 1.24786 30.1145C1.24786 13.8902 14.6253 0.625475 31.0069 0.625475C47.3885 0.625475 60.7507 13.8902 60.7507 30.1145C60.7507 46.3539 47.3885 59.5957 31.0069 59.5957Z"
        fill="currentColor"
      />
    </svg>
  );
};
