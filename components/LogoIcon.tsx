import React from "react";

export default function LogoIcon(props: any) {
  return (
    <svg
      width="100%"
      height={`${70/73*100}%`}
      viewBox="0 0 73 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M43.1529 0.0688553C38.7536 0.483032 34.6566 1.24422 28.4327 2.81138C21.929 4.4457 18.1343 5.77779 14.1492 7.8039C8.65296 10.6024 5.37312 13.7255 3.08954 18.3263C1.05224 22.4233 0 27.6844 0 33.7628C0 36.7852 0.123134 38.1172 0.570894 40.0314C0.67164 40.4344 0.772386 40.9717 0.794774 41.2292C0.817162 41.4978 0.973878 42.0799 1.13059 42.5165C1.79104 44.3523 2.7985 45.9866 5.44028 49.4568C7.72386 52.4568 8.88803 54.4381 9.26863 55.9381C9.49251 56.8224 9.79475 59.0948 9.79475 59.856C9.79475 60.8522 10.5447 63.4045 11.1044 64.3112C11.3955 64.7701 11.944 65.3298 12.3022 65.5201C13.2201 66.0015 14.597 65.5089 15.9626 64.2104C16.4104 63.7851 16.791 63.4493 16.791 63.4604C16.8022 63.4716 16.9925 63.8858 17.2276 64.3672C18.5373 67.188 20.3395 68.3746 22.2872 67.7142C23.1156 67.4343 24.0671 66.4269 24.6492 65.1843C25.0522 64.356 25.1641 64.2104 25.3992 64.2104C25.791 64.2104 26.5186 65.0724 27.3133 66.5052C28.0522 67.8261 28.5223 68.3186 29.4962 68.7888C29.9999 69.0239 30.2686 69.0798 31.0074 69.0798C31.7686 69.0798 31.9924 69.0239 32.4962 68.7664C33.6715 68.1507 34.2536 67.3224 34.8133 65.4978C35.1827 64.244 35.5409 63.606 35.9775 63.4269C36.5596 63.1918 36.9962 63.4381 38.4626 64.8261C39.9514 66.2366 40.567 66.606 41.373 66.5948C42.929 66.5724 44.6864 64.7142 45.3581 62.3634C45.5148 61.8149 45.5484 61.1993 45.5596 58.9493C45.5596 56.2739 45.5708 56.1955 45.817 55.7926C46.4999 54.6955 48.1678 54.1358 51.4924 53.912C57.2573 53.5202 62.0147 52.7366 64.4326 51.7851C69.0781 49.9493 71.7983 46.2441 72.7834 40.412C73.0968 38.5538 73.0632 33.5837 72.7274 31.0986C72.2908 27.8412 71.5408 24.3598 70.3543 20.1173C67.8244 10.9606 65.3729 6.74047 60.8282 3.7069C58.2424 1.96064 55.0185 0.807655 51.1566 0.225571C49.8245 0.0240784 44.7312 -0.0766678 43.1529 0.0688553ZM49.0857 3.55019C54.7386 4.0763 59.1267 6.03525 61.9812 9.3039C64.2199 11.8673 65.7759 15.0576 67.3655 20.33C69.4475 27.2031 70.6901 33.9643 70.6901 38.3747C70.6901 41.1284 70.3655 43.009 69.649 44.509C69.1565 45.5389 67.7908 46.8709 66.6043 47.4978C64.2088 48.7515 60.2797 49.5575 54.1789 50.05C51.3581 50.2739 50.4625 50.3971 49.2312 50.7217C46.6902 51.3933 44.8991 52.8038 43.8581 54.9754C43.22 56.3187 43.1193 57.0799 43.1976 59.8784L43.276 62.3075L42.9961 62.5873C42.4364 63.147 41.8432 62.9231 40.2984 61.5799C39.0894 60.5276 38.429 60.1358 37.567 59.9455C36.526 59.7217 35.429 60.2814 34.6006 61.4567C33.9514 62.3634 33.7835 62.6993 33.2909 64.0985L32.8768 65.2739L32.2499 65.3075C31.0186 65.3746 30.179 64.7701 28.9141 62.9343C27.6492 61.0873 27.1119 60.6731 26.1156 60.7627C25.2648 60.8522 24.7387 61.2888 23.9999 62.509C23.138 63.9418 22.9141 64.1545 22.2425 64.1433C20.832 64.1209 19.5111 62.6993 18.8619 60.5164C18.5149 59.3523 18.4365 59.1731 18.2574 59.106C17.9216 58.9829 17.3059 59.4194 16.6791 60.2366C15.2126 62.1508 14.2388 62.5873 13.4104 61.7142C12.6828 60.953 12.2574 59.6881 12.2574 58.2888C12.2574 56.1396 11.8544 54.1247 11.0597 52.2888C10.1753 50.2515 9.30221 48.9978 6.88431 46.2441C6.07834 45.315 5.16043 44.218 4.86939 43.8038C2.59701 40.6023 1.60074 36.1583 1.93656 30.6061C2.51865 20.8001 4.93655 16.0091 11.2612 12.1024C17.3843 8.30763 27.7723 5.30764 39.8506 3.81884C43.0409 3.42705 46.6678 3.3263 49.0857 3.55019Z"
        fill={props.fill}
      />
      <path
        d="M47.608 21.6621C47.3954 21.8412 47.0036 22.4344 46.7125 22.9829C44.72 26.7889 44.6528 30.6284 46.5222 33.9531C47.1043 34.9829 48.9625 36.9307 50.0819 37.6807C52.8804 39.5501 56.0707 40.2329 58.5222 39.4717C59.3505 39.2142 59.6528 38.9232 60.0893 37.9941C60.4923 37.1322 60.5483 36.6508 60.302 36.3374C60.1453 36.1359 59.7199 36.0016 58.1528 35.6545C53.4961 34.6247 52.0297 33.9307 50.0036 31.8038C49.1864 30.9531 48.8842 30.5389 48.47 29.7105C47.4177 27.5725 47.4066 26.162 48.414 24.024C48.8506 23.0949 48.9737 22.7255 48.9737 22.2777C48.9737 21.3262 48.3245 21.0352 47.608 21.6621Z"
        fill={props.fill}
      />
      <path
        d="M32.4402 26.8337C31.0969 27.0576 29.6752 27.8747 28.5782 29.0389C27.2238 30.483 26.6753 31.9829 26.6641 34.3225C26.6641 35.0949 26.72 36.1135 26.7984 36.5837C26.8991 37.2105 26.8991 37.5576 26.8208 37.871C26.6417 38.509 26.6753 40.5464 26.8656 41.3187C27.4364 43.5351 28.97 45.0911 31.1864 45.6956C32.2499 45.9866 34.1081 45.9642 35.2499 45.6396C38.4849 44.7329 40.8245 42.0575 41.373 38.6546C41.5745 37.3673 41.4513 35.5202 41.0707 34.2665C40.9028 33.7068 40.6566 32.8225 40.511 32.2852C40.0409 30.5165 39.3581 29.4867 38.3282 29.0165C38.0484 28.8822 37.6006 28.5912 37.3207 28.3673C35.776 27.1136 34.0185 26.5539 32.4402 26.8337Z"
        fill={props.fill}
      />
      <path
        d="M10.1977 29.733C8.49625 30.3374 7.17536 31.9046 6.5485 34.0986C6.1679 35.3971 6.11193 37.6807 6.42537 38.912C7.05223 41.4195 8.7873 43.7143 10.791 44.7105C11.6082 45.1135 11.6642 45.1247 12.8619 45.1247C13.9925 45.1247 14.1604 45.1023 14.6753 44.8225C15.9515 44.1508 16.791 42.8747 17.194 41.0053L17.4179 39.9643L16.9701 37.3225C16.2649 33.2367 16.1641 32.8449 15.5485 31.9494C14.9216 31.0315 14.1044 30.2815 13.2761 29.8785C12.4365 29.4643 11.138 29.4083 10.1977 29.733Z"
        fill={props.fill}
      />
      <path
        d="M21.5149 46.1881C20.5074 46.8262 19.9365 48.1023 19.9365 49.7142C19.9253 50.6881 19.9477 50.7441 20.4178 51.6396C20.6865 52.1433 21.0223 52.6695 21.1678 52.8038C21.4253 53.0501 21.4365 53.0501 21.9626 52.8486C23.5186 52.2553 24.8843 49.6695 24.5596 47.9456C24.4365 47.274 24.235 46.8934 23.7649 46.4456C23.0484 45.7628 22.3208 45.6732 21.5149 46.1881Z"
        fill={props.fill}
      />
    </svg>
  );
}
