import type { SVGProps } from "react";

export function SpotIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M16 10C16 7.79 14.21 6 12 6C9.79 6 8 7.79 8 10C8 12.21 9.79 14 12 14C14.21 14 16 12.21 16 10ZM10 10C10 8.9 10.9 8 12 8C13.1 8 14 8.9 14 10C14 11.1 13.1 12 12 12C10.9 12 10 11.1 10 10Z"
        fill="currentColor"
      />
      <path
        d="M11.42 21.81C11.59 21.93 11.8 22 12 22C12.2 22 12.41 21.94 12.58 21.81C12.88 21.59 20.03 16.44 20 9.98999C20 5.57999 16.41 1.98999 12 1.98999C7.59 1.98999 4 5.57999 4 9.98999C3.97 16.43 11.12 21.59 11.42 21.81ZM12 3.99999C15.31 3.99999 18 6.68999 18 9.99999C18.02 14.44 13.61 18.43 12 19.74C10.39 18.43 5.98 14.45 6 9.99999C6 6.68999 8.69 3.99999 12 3.99999Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function MenuIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="18"
      height="12"
      viewBox="0 0 18 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M0 12V10H18V12H0ZM0 7V5H18V7H0ZM0 2V0H18V2H0Z" fill="currentColor" />
    </svg>
  );
}

export function EyeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1 10C1 10 4.5 4 10 4C15.5 4 19 10 19 10C19 10 15.5 16 10 16C4.5 16 1 10 1 10Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function ChevronLeftIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="10"
      height="18"
      viewBox="0 0 10 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9 1L1 9L9 17"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function UserIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="10" cy="6.5" r="3.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M3 17c0-3.5 3.1-6 7-6s7 2.5 7 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function MailIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect x="2" y="4.5" width="16" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M3 6L10 11L17 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PhoneIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M2.25 6.75c0 8.284 6.716 15 15 15h1.5a2.25 2.25 0 002.25-2.25v-1.372a1.125 1.125 0 00-.852-1.091l-4.423-1.106a1.125 1.125 0 00-1.173.417l-.97 1.293a1.125 1.125 0 01-1.21.38 12.035 12.035 0 01-7.143-7.143 1.125 1.125 0 01.38-1.21l1.293-.97a1.125 1.125 0 00.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LockIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-1.5 0h12a1.5 1.5 0 011.5 1.5v6.75a1.5 1.5 0 01-1.5 1.5h-12a1.5 1.5 0 01-1.5-1.5V12a1.5 1.5 0 011.5-1.5z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function EyeOffIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1 10C1 10 4.5 4 10 4C15.5 4 19 10 19 10C19 10 15.5 16 10 16C4.5 16 1 10 1 10Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2 18L18 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function PlaneIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M0 5H2.5L4.6 8H8.2L5 0H8L13.6 8H18C18.55 8 19.0208 8.19583 19.4125 8.5875C19.8042 8.97917 20 9.45 20 10C20 10.55 19.8042 11.0208 19.4125 11.4125C19.0208 11.8042 18.55 12 18 12H13.6L8 20H5L8.2 12H4.6L2.5 15H0L1.5 10L0 5Z"
        fill="#E6F7FF"
      />
    </svg>
  );
}

export function PlaneDepartureIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="21"
      height="19"
      viewBox="0 0 21 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M2 18.15V16.15H20V18.15H2ZM3.75 13.15L0 6.9L2.4 6.25L5.2 8.6L8.7 7.675L3.525 0.775L6.425 0L13.9 6.275L18.15 5.125C18.6833 4.975 19.1875 5.0375 19.6625 5.3125C20.1375 5.5875 20.45 5.99167 20.6 6.525C20.75 7.05833 20.6875 7.5625 20.4125 8.0375C20.1375 8.5125 19.7333 8.825 19.2 8.975L3.75 13.15Z"
        fill="#3F4851"
      />
    </svg>
  );
}

export function PlaneInFlightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="20"
      height="16"
      viewBox="0 0 20 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M0 16L11 0H20L17 16H0ZM12.5 10C13.2 10 13.7917 9.75833 14.275 9.275C14.7583 8.79167 15 8.2 15 7.5C15 6.8 14.7583 6.20833 14.275 5.725C13.7917 5.24167 13.2 5 12.5 5C11.8 5 11.2083 5.24167 10.725 5.725C10.2417 6.20833 10 6.8 10 7.5C10 8.2 10.2417 8.79167 10.725 9.275C11.2083 9.75833 11.8 10 12.5 10Z"
        fill="#E8F6FD"
      />
    </svg>
  );
}

export function PlaneArrivalIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="18"
      height="21"
      viewBox="0 0 18 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M0 20.2V18.2H18V20.2H0ZM15.55 15.15L0 10.725V3.45L2.4 4.125L3.6 7.6L7.05 8.575L6.175 0L9.05 0.85L12.25 10.075L16.55 11.3C16.9667 11.4333 17.3125 11.675 17.5875 12.025C17.8625 12.375 18 12.775 18 13.225C18 13.8083 17.7625 14.3208 17.2875 14.7625C16.8125 15.2042 16.2333 15.3333 15.55 15.15Z"
        fill="#3F4851"
      />
    </svg>
  );
}

export function GateIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M0 18V16H2V0H12V1H16V16H18V18H14V3H12V18H0ZM8 10C8.28333 10 8.52083 9.90417 8.7125 9.7125C8.90417 9.52083 9 9.28333 9 9C9 8.71667 8.90417 8.47917 8.7125 8.2875C8.52083 8.09583 8.28333 8 8 8C7.71667 8 7.47917 8.09583 7.2875 8.2875C7.09583 8.47917 7 8.71667 7 9C7 9.28333 7.09583 9.52083 7.2875 9.7125C7.47917 9.90417 7.71667 10 8 10ZM4 16H10V2H4V16Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function ClockIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M13.3 14.7L14.7 13.3L11 9.6V5H9V10.4L13.3 14.7ZM10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3833 19.7375 12.6833 19.2125 13.9C18.6875 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20ZM10 18C12.2167 18 14.1042 17.2208 15.6625 15.6625C17.2208 14.1042 18 12.2167 18 10C18 7.78333 17.2208 5.89583 15.6625 4.3375C14.1042 2.77917 12.2167 2 10 2C7.78333 2 5.89583 2.77917 4.3375 4.3375C2.77917 5.89583 2 7.78333 2 10C2 12.2167 2.77917 14.1042 4.3375 15.6625C5.89583 17.2208 7.78333 18 10 18Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function WeatherIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="39"
      height="34"
      viewBox="0 0 39 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7.42857 33.1282C5.38571 33.1282 3.6369 32.4453 2.18214 31.0795C0.727381 29.7137 0 28.0718 0 26.1538C0 24.2359 0.727381 22.594 2.18214 21.2282C3.6369 19.8624 5.38571 19.1795 7.42857 19.1795C8.91429 19.1795 10.2839 19.5573 11.5375 20.3128C12.7911 21.0684 13.6964 22.1 14.2536 23.4077L14.7179 24.4103H15.8321C17.1321 24.4103 18.2232 24.8316 19.1054 25.6744C19.9875 26.5171 20.4286 27.5487 20.4286 28.7692C20.4286 29.9897 19.9798 31.0214 19.0821 31.8641C18.1845 32.7068 17.0857 33.1282 15.7857 33.1282H7.42857ZM24.0964 28.2462C23.9726 26.4154 23.2685 24.8316 21.9839 23.4949C20.6994 22.1581 19.0821 21.3299 17.1321 21.0103C16.1726 19.441 14.8804 18.1987 13.2554 17.2833C11.6304 16.3679 9.84286 15.8376 7.89286 15.6923C8.69762 13.5709 10.075 11.8782 12.025 10.6141C13.975 9.35 16.1571 8.71795 18.5714 8.71795C21.6667 8.71795 24.2976 9.73504 26.4643 11.7692C28.631 13.8034 29.7143 16.2735 29.7143 19.1795C29.7143 21.0684 29.219 22.8192 28.2286 24.4321C27.2381 26.0449 25.8607 27.3162 24.0964 28.2462ZM16.7143 6.97436V0H20.4286V6.97436H16.7143ZM29.0643 11.7692L26.4643 9.3282L31.6643 4.35897L34.3107 6.84359L29.0643 11.7692ZM31.5714 20.9231V17.4359H39V20.9231H31.5714ZM31.6643 34L26.4643 29.0308L29.0643 26.5897L34.3571 31.4718L31.6643 34ZM8.07857 11.7692L2.83214 6.84359L5.47857 4.35897L10.6786 9.3282L8.07857 11.7692Z"
        fill="#E6F7FF"
      />
    </svg>
  );
}

export function PassportIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="16"
      height="20"
      viewBox="0 0 16 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M2 20C1.45 20 0.979167 19.8042 0.5875 19.4125C0.195833 19.0208 0 18.55 0 18V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H14C14.55 0 15.0208 0.195833 15.4125 0.5875C15.8042 0.979167 16 1.45 16 2V18C16 18.55 15.8042 19.0208 15.4125 19.4125C15.0208 19.8042 14.55 20 14 20H2ZM2 18H14V2H12V9L9.5 7.5L7 9V2H2V18ZM2 18V2V18ZM7 9L9.5 7.5L12 9L9.5 7.5L7 9Z"
        fill="#0EA5E9"
      />
    </svg>
  );
}

export function LoungeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="22"
      height="18"
      viewBox="0 0 22 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M4 18C3.71667 18 3.47917 17.9042 3.2875 17.7125C3.09583 17.5208 3 17.2833 3 17V16C2.16667 16 1.45833 15.7083 0.875 15.125C0.291667 14.5417 0 13.8333 0 13V8C0 7.16667 0.291667 6.45833 0.875 5.875C1.45833 5.29167 2.16667 5 3 5V3C3 2.16667 3.29167 1.45833 3.875 0.875C4.45833 0.291667 5.16667 0 6 0H16C16.8333 0 17.5417 0.291667 18.125 0.875C18.7083 1.45833 19 2.16667 19 3V5C19.8333 5 20.5417 5.29167 21.125 5.875C21.7083 6.45833 22 7.16667 22 8V13C22 13.8333 21.7083 14.5417 21.125 15.125C20.5417 15.7083 19.8333 16 19 16V17C19 17.2833 18.9042 17.5208 18.7125 17.7125C18.5208 17.9042 18.2833 18 18 18C17.7167 18 17.4792 17.9042 17.2875 17.7125C17.0958 17.5208 17 17.2833 17 17V16H5V17C5 17.2833 4.90417 17.5208 4.7125 17.7125C4.52083 17.9042 4.28333 18 4 18ZM3 14H19C19.2833 14 19.5208 13.9042 19.7125 13.7125C19.9042 13.5208 20 13.2833 20 13V8C20 7.71667 19.9042 7.47917 19.7125 7.2875C19.5208 7.09583 19.2833 7 19 7C18.7167 7 18.4792 7.09583 18.2875 7.2875C18.0958 7.47917 18 7.71667 18 8V12H4V8C4 7.71667 3.90417 7.47917 3.7125 7.2875C3.52083 7.09583 3.28333 7 3 7C2.71667 7 2.47917 7.09583 2.2875 7.2875C2.09583 7.47917 2 7.71667 2 8V13C2 13.2833 2.09583 13.5208 2.2875 13.7125C2.47917 13.9042 2.71667 14 3 14ZM6 10H16V8C16 7.55 16.0917 7.14167 16.275 6.775C16.4583 6.40833 16.7 6.08333 17 5.8V3C17 2.71667 16.9042 2.47917 16.7125 2.2875C16.5208 2.09583 16.2833 2 16 2H6C5.71667 2 5.47917 2.09583 5.2875 2.2875C5.09583 2.47917 5 2.71667 5 3V5.8C5.3 6.08333 5.54167 6.40833 5.725 6.775C5.90833 7.14167 6 7.55 6 8V10Z"
        fill="#0A0A0A"
      />
    </svg>
  );
}

export function MapPinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="45"
      height="45"
      viewBox="0 0 45 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M22.4999 33.75L13.9359 21.6562C12.5341 20.0012 11.6314 17.9819 11.3328 15.8337C11.0343 13.6854 11.3522 11.4965 12.2496 9.52194C13.147 7.54737 14.5869 5.8684 16.4017 4.68055C18.2164 3.4927 20.3313 2.84487 22.4999 2.8125C25.5061 2.84221 28.378 4.06209 30.4866 6.20496C32.5952 8.34783 33.7687 11.239 33.7499 14.2453C33.7511 16.8679 32.8582 19.4125 31.2187 21.4594L22.4999 33.75ZM22.4999 5.625C20.2385 5.65097 18.0798 6.57334 16.4978 8.18959C14.9158 9.80583 14.0399 11.9838 14.0624 14.2453C14.0731 16.3092 14.8155 18.3024 16.1577 19.8703L22.4999 28.8563L29.0109 19.6875C30.2485 18.1427 30.9274 16.2247 30.9374 14.2453C30.9599 11.9838 30.084 9.80583 28.5021 8.18959C26.9201 6.57334 24.7614 5.65097 22.4999 5.625Z"
        fill="currentColor"
      />
      <path
        d="M22.5 15.4688C24.0533 15.4688 25.3125 14.2096 25.3125 12.6562C25.3125 11.1029 24.0533 9.84375 22.5 9.84375C20.9467 9.84375 19.6875 11.1029 19.6875 12.6562C19.6875 14.2096 20.9467 15.4688 22.5 15.4688Z"
        fill="currentColor"
      />
      <path
        d="M39.375 16.875H36.5625V19.6875H39.375V39.375H5.625V19.6875H8.4375V16.875H5.625C4.87908 16.875 4.16371 17.1713 3.63626 17.6988C3.10882 18.2262 2.8125 18.9416 2.8125 19.6875V39.375C2.8125 40.1209 3.10882 40.8363 3.63626 41.3637C4.16371 41.8912 4.87908 42.1875 5.625 42.1875H39.375C40.1209 42.1875 40.8363 41.8912 41.3637 41.3637C41.8912 40.8363 42.1875 40.1209 42.1875 39.375V19.6875C42.1875 18.9416 41.8912 18.2262 41.3637 17.6988C40.8363 17.1713 40.1209 16.875 39.375 16.875Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function TicketIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M9.5 6v12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="1.6 2"
      />
    </svg>
  );
}

export function BoardingPassIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M14 0H21V5.83333H18.6667V2.33333H14V0ZM7 0V2.33333H2.33333V5.83333H0V0H7ZM14 21V18.6667H18.6667V15.1667H21V21H14ZM7 21H0V15.1667H2.33333V18.6667H7V21ZM0 9.33333H21V11.6667H0V9.33333Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function ShirtIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M5.01932 6.71597C4.30032 7.40797 3.94232 7.75397 3.50532 7.74997C2.48232 7.74097 0.676324 5.75397 0.752324 4.73597C0.783324 4.32397 1.14932 4.01497 1.88232 3.39697L4.07932 1.54397C4.72932 0.994972 5.62332 0.973972 6.43532 0.816972C6.75932 0.754972 6.92132 0.722972 7.06532 0.778972C7.52932 0.958972 7.91232 1.80297 8.18932 2.18397C9.35432 3.78797 9.93632 4.58997 10.7503 4.58997C11.5643 4.58997 12.1473 3.78797 13.3123 2.18397C13.5883 1.80297 13.9723 0.957972 14.4353 0.778972C14.5793 0.722972 14.7413 0.754972 15.0653 0.816972C15.9093 0.979972 16.7423 0.970972 17.4213 1.54397L19.6193 3.39697C20.3513 4.01497 20.7183 4.32397 20.7493 4.73597C20.8243 5.75397 19.0193 7.74097 17.9963 7.74997C17.5583 7.75397 17.2003 7.40797 16.4823 6.71597"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.75038 5.74997C6.25038 7.74997 5.70638 9.93197 5.34838 11.968C4.97038 14.118 4.33338 15.426 3.97038 17.191C3.72038 18.403 3.59538 19.009 4.08438 19.521C5.46238 20.968 15.6844 21.341 17.4164 19.521C17.9054 19.009 17.7804 18.403 17.5304 17.191C17.1674 15.426 16.5304 14.118 16.1524 11.968C15.7944 9.92997 15.2504 7.74997 16.7504 5.74997"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BagIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.569 1.886C1.79162 1.32934 2.17592 0.852156 2.67233 0.51599C3.16874 0.179824 3.75448 9.96995e-05 4.354 0H15.646C16.2455 9.96995e-05 16.8313 0.179824 17.3277 0.51599C17.8241 0.852156 18.2084 1.32934 18.431 1.886L19.326 4.122C19.5815 4.76113 19.6094 5.46867 19.4051 6.12596C19.2009 6.78325 18.7768 7.3503 18.204 7.732L18 7.87V18H19C19.2652 18 19.5196 18.1054 19.7071 18.2929C19.8946 18.4804 20 18.7348 20 19C20 19.2652 19.8946 19.5196 19.7071 19.7071C19.5196 19.8946 19.2652 20 19 20H1C0.734784 20 0.48043 19.8946 0.292893 19.7071C0.105357 19.5196 0 19.2652 0 19C0 18.7348 0.105357 18.4804 0.292893 18.2929C0.48043 18.1054 0.734784 18 1 18H2V7.869L1.796 7.732C1.22323 7.3503 0.79914 6.78325 0.594853 6.12596C0.390566 5.46867 0.418511 4.76113 0.674 4.122L1.569 1.886ZM4 8.596V18H7V14C7 13.2044 7.31607 12.4413 7.87868 11.8787C8.44129 11.3161 9.20435 11 10 11C10.7956 11 11.5587 11.3161 12.1213 11.8787C12.6839 12.4413 13 13.2044 13 14V18H16V8.596C15.42 8.596 14.84 8.428 14.336 8.092L13 7.202L11.664 8.092C11.1712 8.42049 10.5922 8.59578 10 8.59578C9.40777 8.59578 8.82878 8.42049 8.336 8.092L7 7.202L5.664 8.092C5.17124 8.42057 4.59226 8.59593 4 8.596ZM11 18V14C11 13.7348 10.8946 13.4804 10.7071 13.2929C10.5196 13.1054 10.2652 13 10 13C9.73478 13 9.48043 13.1054 9.29289 13.2929C9.10536 13.4804 9 13.7348 9 14V18H11Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function HomeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M3 9.5L10 3L17 9.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 8V16C5 16.55 5.45 17 6 17H14C14.55 17 15 16.55 15 16V8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CartIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1 1H3L5.4 12.2C5.5 12.7 5.95 13 6.45 13H15.1C15.6 13 16.05 12.65 16.15 12.15L17.8 4.5H4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="7" cy="17" r="1.3" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="14.5" cy="17" r="1.3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function ScanIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M2 6V3.5C2 2.67 2.67 2 3.5 2H6M14 2H16.5C17.33 2 18 2.67 18 3.5V6M18 14V16.5C18 17.33 17.33 18 16.5 18H14M6 18H3.5C2.67 18 2 17.33 2 16.5V14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M2 10H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function CheckCircleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M6.5 10.2L8.7 12.4L13.5 7.6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function RefreshIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M17 5V9H13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 15V11H7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.5 8C5.3 5.7 7.5 4 10 4C12.7 4 15 5.7 16.5 8M15.5 12C14.7 14.3 12.5 16 10 16C7.3 16 5 14.3 3.5 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function StarIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10 1.5L12.47 7L18.5 7.6L13.9 11.5L15.3 17.5L10 14.3L4.7 17.5L6.1 11.5L1.5 7.6L7.53 7L10 1.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CareIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10 1.5C10 1.5 4.5 8.2 4.5 12.5C4.5 15.5 7 18 10 18C13 18 15.5 15.5 15.5 12.5C15.5 8.2 10 1.5 10 1.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CardIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect x="1.5" y="4" width="17" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M1.5 8H18.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function ChatIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M2 3.5C2 2.67 2.67 2 3.5 2H16.5C17.33 2 18 2.67 18 3.5V12.5C18 13.33 17.33 14 16.5 14H7L3 17.5V14H3.5C2.67 14 2 13.33 2 12.5V3.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CreditCardWalletIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="20"
      height="16"
      viewBox="0 0 20 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M15.58 0H3.92C3.386 0 2.94 2.10479e-07 2.575 0.0300002C2.195 0.0600002 1.839 0.128 1.501 0.3C0.984122 0.563319 0.563749 0.983342 0.3 1.5C0.128 1.838 0.06 2.194 0.03 2.574C-2.79397e-08 2.939 0 3.384 0 3.919V11.579C0 12.114 -2.79397e-08 12.559 0.03 12.924C0.06 13.304 0.128 13.66 0.3 13.997C0.56324 14.5148 0.983666 14.9359 1.501 15.2C1.838 15.371 2.195 15.438 2.574 15.47C2.938 15.499 3.384 15.499 3.916 15.499H15.584C16.117 15.499 16.562 15.499 16.925 15.469C17.305 15.439 17.661 15.371 17.998 15.199C18.5159 14.9355 18.9371 14.5147 19.201 13.997C19.372 13.66 19.439 13.304 19.471 12.925C19.5 12.561 19.5 12.116 19.5 11.583V3.916C19.5 3.383 19.5 2.938 19.47 2.574C19.44 2.194 19.372 1.838 19.2 1.501C18.9362 0.983818 18.5154 0.56341 17.998 0.3C17.661 0.128 17.304 0.0600002 16.924 0.0300002C16.561 2.10479e-07 16.113 0 15.58 0ZM2.183 1.636C2.273 1.59 2.411 1.548 2.698 1.525C2.994 1.501 3.378 1.5 3.951 1.5H15.551C16.124 1.5 16.508 1.5 16.803 1.525C17.09 1.548 17.227 1.59 17.318 1.636C17.554 1.756 17.745 1.948 17.865 2.182C17.911 2.272 17.953 2.41 17.976 2.697C18 2.992 18.001 3.376 18.001 3.947V4H1.5V3.95C1.5 3.378 1.5 2.993 1.525 2.697C1.548 2.41 1.59 2.273 1.636 2.182C1.756 1.947 1.948 1.756 2.183 1.636ZM3.75 10H7.75C7.94891 10 8.13968 10.079 8.28033 10.2197C8.42098 10.3603 8.5 10.5511 8.5 10.75C8.5 10.9489 8.42098 11.1397 8.28033 11.2803C8.13968 11.421 7.94891 11.5 7.75 11.5H3.75C3.55109 11.5 3.36032 11.421 3.21967 11.2803C3.07902 11.1397 3 10.9489 3 10.75C3 10.5511 3.07902 10.3603 3.21967 10.2197C3.36032 10.079 3.55109 10 3.75 10Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function DocumentIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect x="3" y="1.5" width="14" height="17" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M6.5 6H13.5M6.5 10H13.5M6.5 14H10.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function LogoutIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8 17.5H4.5C3.67 17.5 3 16.83 3 16V4C3 3.17 3.67 2.5 4.5 2.5H8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13 14L17 10L13 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M17 10H7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function DigitalWalletIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="20"
      height="16"
      viewBox="0 0 20 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M16 0H4C1.79 0 0 1.79 0 4V12C0 14.21 1.79 16 4 16H16C18.21 16 20 14.21 20 12V4C20 1.79 18.21 0 16 0ZM14.14 9.77C13.9 9.97 13.57 10.05 13.26 9.97L2.15 7.25C2.45 6.52 3.16 6 4 6H16C16.67 6 17.26 6.34 17.63 6.84L14.14 9.77ZM4 2H16C17.1 2 18 2.9 18 4V4.55C17.41 4.21 16.73 4 16 4H4C3.27 4 2.59 4.21 2 4.55V4C2 2.9 2.9 2 4 2Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function LockFilledIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="16"
      height="20"
      viewBox="0 0 16 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8 0C9.32608 0 10.5979 0.526784 11.5355 1.46447C12.4732 2.40215 13 3.67392 13 5V8C13.7956 8 14.5587 8.31607 15.1213 8.87868C15.6839 9.44129 16 10.2044 16 11V17C16 17.7956 15.6839 18.5587 15.1213 19.1213C14.5587 19.6839 13.7956 20 13 20H3C2.20435 20 1.44129 19.6839 0.87868 19.1213C0.316071 18.5587 0 17.7956 0 17V11C0 10.2044 0.316071 9.44129 0.87868 8.87868C1.44129 8.31607 2.20435 8 3 8V5C3 3.67392 3.52678 2.40215 4.46447 1.46447C5.40215 0.526784 6.67392 0 8 0ZM8 12C7.49542 11.9998 7.00943 12.1904 6.63945 12.5335C6.26947 12.8766 6.04284 13.3468 6.005 13.85L6 14C6 14.3956 6.1173 14.7822 6.33706 15.1111C6.55682 15.44 6.86918 15.6964 7.23463 15.8478C7.60009 15.9991 8.00222 16.0387 8.39018 15.9616C8.77814 15.8844 9.13451 15.6939 9.41421 15.4142C9.69392 15.1345 9.8844 14.7781 9.96157 14.3902C10.0387 14.0022 9.99913 13.6001 9.84776 13.2346C9.69638 12.8692 9.44004 12.5568 9.11114 12.3371C8.78224 12.1173 8.39556 12 8 12ZM8 2C7.20435 2 6.44129 2.31607 5.87868 2.87868C5.31607 3.44129 5 4.20435 5 5V8H11V5C11 4.20435 10.6839 3.44129 10.1213 2.87868C9.55871 2.31607 8.79565 2 8 2Z"
        fill="#E6F7FF"
      />
    </svg>
  );
}

export function HangerIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="33"
      height="29"
      viewBox="0 0 33 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M13.6988 16.1752C14.4084 15.7139 15.2367 15.4684 16.0831 15.4684C16.9296 15.4684 17.7578 15.7139 18.4675 16.1752L29.806 23.5449C30.1478 23.7671 30.4086 24.0938 30.5496 24.4763C30.6906 24.8588 30.7041 25.2766 30.5883 25.6674C30.4724 26.0583 30.2334 26.4012 29.9067 26.6451C29.5801 26.889 29.1834 27.0208 28.7757 27.0209H3.39052C2.98287 27.0208 2.58616 26.889 2.25952 26.6451C1.93288 26.4012 1.69381 26.0583 1.57796 25.6674C1.46211 25.2766 1.47568 24.8588 1.61665 24.4763C1.75762 24.0938 2.01843 23.7671 2.36021 23.5449L13.6988 16.1752Z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.0831 14.625C16.0831 14.625 20.4581 8.29146 20.4581 5.875C20.4581 4.71468 19.9972 3.60188 19.1767 2.78141C18.3563 1.96094 17.2435 1.5 16.0831 1.5C14.9228 1.5 13.81 1.96094 12.9895 2.78141C12.1691 3.60188 11.7081 4.71468 11.7081 5.875"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SignalWavesIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="25"
      height="37"
      viewBox="0 0 25 37"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1.00018 12.0601C2.11878 14.0221 2.70705 16.2416 2.70705 18.5001C2.70705 20.7586 2.11878 22.9781 1.00018 24.9401M7.05518 8.36762C8.80353 11.4584 9.72237 14.9491 9.72237 18.5001C9.72237 22.0512 8.80353 25.5418 7.05518 28.6326M13.0927 4.67512C15.5035 8.88323 16.7732 13.6481 16.7763 18.4978C16.7794 23.3475 15.5156 28.114 13.1102 32.3251M19.1477 1.00012C22.1924 6.32994 23.7939 12.3619 23.7939 18.5001C23.7939 24.6383 22.1924 30.6703 19.1477 36.0001"
        stroke="#006397"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function NfcWaveIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 13 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M5.53854 10.9824C5.27674 10.7206 5.14583 10.4001 5.14583 10.0209C5.14583 9.64175 5.27674 9.32126 5.53854 9.05946C5.80035 8.79765 6.12083 8.66675 6.5 8.66675C6.87917 8.66675 7.19965 8.79765 7.46146 9.05946C7.72326 9.32126 7.85417 9.64175 7.85417 10.0209C7.85417 10.4001 7.72326 10.7206 7.46146 10.9824C7.19965 11.2442 6.87917 11.3751 6.5 11.3751C6.12083 11.3751 5.80035 11.2442 5.53854 10.9824ZM8.42996 5.74175C9.03915 5.95841 9.59202 6.25633 10.0885 6.6355C10.2691 6.77091 10.3617 6.9493 10.3664 7.17066C10.3711 7.39203 10.292 7.58378 10.1292 7.74591C9.9757 7.89939 9.78611 7.97847 9.56042 7.98316C9.33472 7.98786 9.1316 7.92683 8.95104 7.80008C8.60799 7.56536 8.22882 7.38029 7.81354 7.24487C7.39826 7.10946 6.96042 7.04175 6.5 7.04175C6.03958 7.04175 5.60174 7.10946 5.18646 7.24487C4.77118 7.38029 4.39201 7.56536 4.04896 7.80008C3.8684 7.92647 3.66528 7.98515 3.43958 7.97612C3.21389 7.96709 3.02431 7.88584 2.87083 7.73237C2.71736 7.56987 2.64063 7.37812 2.64063 7.15712C2.64063 6.93612 2.7309 6.75773 2.91146 6.62196C3.40799 6.24279 3.96103 5.94704 4.57058 5.73471C5.18014 5.52237 5.82328 5.41639 6.5 5.41675C7.17672 5.41711 7.82004 5.52544 8.42996 5.74175ZM9.68879 2.72196C10.6865 3.0921 11.5826 3.61571 12.3771 4.29279C12.5576 4.44626 12.6524 4.63585 12.6615 4.86154C12.6705 5.08723 12.5938 5.28133 12.4313 5.44383C12.2778 5.5973 12.0882 5.67639 11.8625 5.68108C11.6368 5.68578 11.4337 5.61572 11.2531 5.47091C10.6031 4.93828 9.87422 4.52535 9.06642 4.23212C8.25861 3.9389 7.40314 3.79211 6.5 3.79175C5.59686 3.79139 4.74157 3.93818 3.93413 4.23212C3.12668 4.52607 2.3976 4.939 1.74688 5.47091C1.56632 5.61536 1.3632 5.68541 1.1375 5.68108C0.911806 5.67675 0.722223 5.59766 0.568751 5.44383C0.406251 5.28133 0.329515 5.08723 0.338542 4.86154C0.34757 4.63585 0.442362 4.44626 0.622917 4.29279C1.41736 3.61571 2.31346 3.0921 3.31121 2.72196C4.30896 2.35182 5.37189 2.16675 6.5 2.16675C7.62811 2.16675 8.69122 2.35182 9.68933 2.72196"
        fill="#0EA5E9"
      />
    </svg>
  );
}

export function BluetoothIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="8"
      height="13"
      viewBox="0 0 8 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M0.5 3.38048L6.80721 9.24475L3.64608 12.0955V0.5L6.80721 3.34644L0.5 9.2689"
        stroke="#0EA5E9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TicketStubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="25"
      height="20"
      viewBox="0 0 25 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M16 1V3.5M16 8.5V11M16 16V18.5M3.5 1H21C21.663 1 22.2989 1.26339 22.7678 1.73223C23.2366 2.20107 23.5 2.83696 23.5 3.5V7.25C22.837 7.25 22.2011 7.51339 21.7322 7.98223C21.2634 8.45107 21 9.08696 21 9.75C21 10.413 21.2634 11.0489 21.7322 11.5178C22.2011 11.9866 22.837 12.25 23.5 12.25V16C23.5 16.663 23.2366 17.2989 22.7678 17.7678C22.2989 18.2366 21.663 18.5 21 18.5H3.5C2.83696 18.5 2.20107 18.2366 1.73223 17.7678C1.26339 17.2989 1 16.663 1 16V12.25C1.66304 12.25 2.29893 11.9866 2.76777 11.5178C3.23661 11.0489 3.5 10.413 3.5 9.75C3.5 9.08696 3.23661 8.45107 2.76777 7.98223C2.29893 7.51339 1.66304 7.25 1 7.25V3.5C1 2.83696 1.26339 2.20107 1.73223 1.73223C2.20107 1.26339 2.83696 1 3.5 1Z"
        stroke="#0369A1"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ShoppingBagIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="25"
      height="22"
      viewBox="0 0 25 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M2.25 9.75024H22.25M2.25 9.75024L4.315 19.0427C4.43841 19.5979 4.74741 20.0944 5.19101 20.4503C5.63461 20.8061 6.18629 21.0001 6.755 21.0002H17.745C18.3137 21.0001 18.8654 20.8061 19.309 20.4503C19.7526 20.0944 20.0616 19.5979 20.185 19.0427L22.25 9.75024M2.25 9.75024C1.91848 9.75024 1.60054 9.61855 1.36612 9.38413C1.1317 9.14971 1 8.83176 1 8.50024V7.25024C1 6.91872 1.1317 6.60078 1.36612 6.36636C1.60054 6.13194 1.91848 6.00024 2.25 6.00024H22.25C22.5815 6.00024 22.8995 6.13194 23.1339 6.36636C23.3683 6.60078 23.5 6.91872 23.5 7.25024V8.50024C23.5 8.83176 23.3683 9.14971 23.1339 9.38413C22.8995 9.61855 22.5815 9.75024 22.25 9.75024M6 6.00024L8.5 1.00024M18.5 6.00024L16 1.00024"
        stroke="#0369A1"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function AiLogoIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="28"
      height="23"
      viewBox="0 0 28 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M-4.88237e-05 22.2L7.64995 -4.91142e-05H12.96L20.64 22.2H16.38L14.79 17.52H5.84995L4.25995 22.2H-4.88237e-05ZM7.01995 13.98H13.62L10.32 4.16995L7.01995 13.98ZM23.8443 22.2V-4.91142e-05H27.9243V22.2H23.8443Z"
        fill="#0369A1"
      />
    </svg>
  );
}

export function DressIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8.35869 10.6214C7.40003 11.544 6.92269 12.0054 6.34003 12C4.97603 11.988 2.56803 9.33871 2.66936 7.98138C2.71069 7.43204 3.19869 7.02004 4.17603 6.19604L7.10536 3.72538C7.97203 2.99338 9.16402 2.96538 10.2467 2.75604C10.6787 2.67338 10.8947 2.63071 11.0867 2.70538C11.7054 2.94538 12.216 4.07071 12.5854 4.57871C14.1387 6.71738 14.9147 7.78671 16 7.78671C17.0854 7.78671 17.8627 6.71738 19.416 4.57871C19.784 4.07071 20.296 2.94404 20.9134 2.70538C21.1054 2.63071 21.3214 2.67338 21.7534 2.75604C22.8787 2.97338 23.9894 2.96138 24.8947 3.72538L27.8254 6.19604C28.8014 7.02004 29.2907 7.43204 29.332 7.98138C29.432 9.33871 27.0254 11.988 25.6614 12C25.0774 12.0054 24.6 11.544 23.6427 10.6214"
        stroke="#0369A1"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.00002 9.3335C10 12.0002 9.27469 14.9095 8.79736 17.6242C8.29336 20.4908 7.44402 22.2348 6.96002 24.5882C6.62669 26.2042 6.46002 27.0122 7.11202 27.6948C8.94936 29.6242 22.5787 30.1215 24.888 27.6948C25.54 27.0122 25.3734 26.2042 25.04 24.5882C24.556 22.2348 23.7067 20.4908 23.2027 17.6242C22.7254 14.9068 22 12.0002 24 9.3335"
        stroke="#0369A1"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HomeBadgeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="50"
      height="50"
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="50" height="50" rx="10" fill="#0EA5E9" />
      <path
        d="M13.75 37.3429H19.375V28.2C19.375 27.6819 19.555 27.2479 19.915 26.8981C20.275 26.5482 20.72 26.3726 21.25 26.3714H28.75C29.2812 26.3714 29.7269 26.547 30.0869 26.8981C30.4469 27.2491 30.6262 27.6831 30.625 28.2V37.3429H36.25V20.8857L25 12.6571L13.75 20.8857V37.3429ZM10 37.3429V20.8857C10 20.3067 10.1331 19.7581 10.3994 19.24C10.6656 18.7219 11.0325 18.2952 11.5 17.96L22.75 9.73143C23.4062 9.24381 24.1562 9 25 9C25.8437 9 26.5937 9.24381 27.25 9.73143L38.5 17.96C38.9687 18.2952 39.3362 18.7219 39.6025 19.24C39.8687 19.7581 40.0012 20.3067 40 20.8857V37.3429C40 38.3486 39.6325 39.2098 38.8975 39.9266C38.1625 40.6434 37.28 41.0012 36.25 41H28.75C28.2187 41 27.7737 40.8245 27.415 40.4734C27.0562 40.1223 26.8762 39.6883 26.875 39.1714V30.0286H23.125V39.1714C23.125 39.6895 22.945 40.1241 22.585 40.4752C22.225 40.8263 21.78 41.0012 21.25 41H13.75C12.7187 41 11.8362 40.6422 11.1025 39.9266C10.3687 39.211 10.0012 38.3498 10 37.3429Z"
        fill="#E6F7FF"
      />
    </svg>
  );
}

export function AirplaneOutlineIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="36"
      height="30"
      viewBox="0 0 36 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M27.0746 12.2255L33.2854 6.22039C33.7846 5.737 34.1441 5.16774 34.3372 4.55496C34.5302 3.94218 34.5519 3.30167 34.4006 2.6811C34.3351 2.40966 34.1726 2.16025 33.9336 1.96446C33.6947 1.76868 33.39 1.63533 33.0584 1.58133C32.2998 1.45752 31.5169 1.47526 30.7679 1.63322C30.0189 1.79118 29.3231 2.0853 28.7323 2.49369L21.3902 7.57659L5.76177 4.08991L2.92059 6.41436L15.7079 12.2255L8.60294 19.2005L5.05047 18.6186L1.5 21.525L7.18235 23.8494L10.0235 28.5L13.576 25.5936L12.8647 22.6872L21.3902 16.8761L28.4952 27.3378L31.3364 25.0117L27.0746 12.2255Z"
        stroke="#0369A1"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MileageIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="31"
      height="31"
      viewBox="0 0 31 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M15.5 22.3889C14.5528 22.3889 13.7422 22.0519 13.0682 21.3779C12.3943 20.704 12.0567 19.8928 12.0556 18.9444C12.0544 17.9961 12.392 17.1855 13.0682 16.5127C13.7445 15.8399 14.5551 15.5023 15.5 15.5C16.4449 15.4977 17.2561 15.8353 17.9335 16.5127C18.6109 17.1901 18.9479 18.0007 18.9444 18.9444C18.941 19.8882 18.604 20.6994 17.9335 21.3779C17.263 22.0565 16.4518 22.3935 15.5 22.3889ZM7.53472 6.88889H23.4653L25.6611 2.49722C25.9481 1.92315 25.9263 1.36343 25.5957 0.818055C25.265 0.272685 24.7701 0 24.1111 0H6.88889C6.2287 0 5.73385 0.272685 5.40433 0.818055C5.07481 1.36343 5.053 1.92315 5.33889 2.49722L7.53472 6.88889ZM9.3 31H21.7C24.2833 31 26.4792 30.1033 28.2875 28.3099C30.0958 26.5165 31 24.3132 31 21.7C31 20.6093 30.8134 19.5472 30.4403 18.5139C30.0671 17.4806 29.5361 16.5477 28.8472 15.7153L24.3694 10.3333H6.63056L2.15278 15.7153C1.46389 16.5477 0.93287 17.4806 0.559722 18.5139C0.186574 19.5472 0 20.6093 0 21.7C0 24.312 0.897278 26.5153 2.69183 28.3099C4.48639 30.1044 6.68911 31.0011 9.3 31Z"
        fill="#0369A1"
      />
    </svg>
  );
}

export function ChevronRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="8"
      height="13"
      viewBox="0 0 8 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M0 1.06L1.06 0L6.84 5.777C6.933 5.87 7.007 5.98 7.058 6.101C7.108 6.222 7.134 6.352 7.134 6.483C7.134 6.615 7.108 6.745 7.058 6.866C7.007 6.987 6.933 7.097 6.84 7.19L1.06 12.97L0 11.91L5.425 6.485L0 1.06Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function CouponIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="16"
      height="21"
      viewBox="0 0 16 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.784 0.334C9.942 0.164 10.155 0.05 10.387 0.013C10.619 -0.024 10.858 0.018 11.063 0.13C11.268 0.243 11.428 0.421 11.516 0.635C11.604 0.848 11.616 1.085 11.549 1.306L9.738 7.278H14.267C15.796 7.278 16.572 9.077 15.509 10.151L5.07 20.692C4.905 20.857 4.689 20.963 4.455 20.992C4.221 21.021 3.984 20.971 3.783 20.85C3.582 20.73 3.429 20.546 3.349 20.329C3.269 20.112 3.266 19.875 3.342 19.657L5.56 13.257H1.732C0.233 13.255 -0.556 11.514 0.451 10.424L9.784 0.334Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function BellIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="18"
      height="20"
      viewBox="0 0 18 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9 1C6.79 1 5 2.79 5 5V8.5C5 9.5 4.6 10.46 3.9 11.17L2.7 12.38C2.15 12.93 2 13.76 2.3 14.47C2.6 15.18 3.3 15.64 4.07 15.64H13.93C14.7 15.64 15.4 15.18 15.7 14.47C16 13.76 15.85 12.93 15.3 12.38L14.1 11.17C13.4 10.46 13 9.5 13 8.5V5C13 2.79 11.21 1 9 1Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.5 18C11.19 18.6 10.35 19 9.5 19C8.65 19 7.81 18.6 7.5 18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PencilIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="14"
      height="13"
      viewBox="0 0 14 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9.763 0.704L0.324 8.744M12.909 4.549L3.47 12.59M0.5 8.363V11.859M0.098 11.369L3.594 12.069M9.809 0.336L13.305 4.182"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SearchIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M17 17L13 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function ChevronDownIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="14"
      height="8"
      viewBox="0 0 14 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1 1L7 7L13 1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
