// index.js
function VideoPlayer() {
  const videoRef = React.useRef(null);
  const [showVideo, setShowVideo] = React.useState(false);
  const [isAndroid, setIsAndroid] = React.useState(false);

  // Simplified device detection in useEffect
  React.useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    setIsAndroid(/android/i.test(userAgent));
  }, []);

  // Regular handleThumbnailClick for non-Android devices
  const handleThumbnailClick = () => {
    setShowVideo(true);
    setTimeout(() => {
      const video = videoRef.current;
      if (video) {
        if (video.requestFullscreen) {
          video.requestFullscreen();
        } else if (video.msRequestFullscreen) {
          video.msRequestFullscreen();
        } else if (video.mozRequestFullScreen) {
          video.mozRequestFullScreen();
        } else if (video.webkitRequestFullScreen) {
          video.webkitRequestFullScreen();
        }
        video.play();
      }
    }, 100);
  };

  // Android-specific render
  if (isAndroid) {
    return (
      <div
        className="w-full aspect-video relative cursor-pointer"
        onClick={handleThumbnailClick}
      >
        <img
          src="https://cloud-kr.store/daewon/agora2504/img/screen2/thumbnail.jpg"
          // src="./img/screen2/thumbnail.png"
          alt="Video thumbnail"
          className="w-full h-full object-cover"
        />
        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center">
            <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[20px] border-l-black border-b-[10px] border-b-transparent ml-1"></div>
          </div>
        </div>
      </div>

    );
  }

  // Regular render for non-Android devices
  return (
    <div className="w-full flex flex-col items-center mb-10 slide-up relative md:block hidden">
      {/* Thumbnail */}
      {!showVideo && (
        <div
          className="w-full aspect-video relative cursor-pointer"
          onClick={handleThumbnailClick}
        >
          <img
            src="https://cloud-kr.store/daewon/agora2504/img/screen2/thumbnail.jpg"
            // src="./img/screen2/thumbnail.png"
            alt="Video thumbnail"
            className="w-full h-full object-cover"
          />
          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center">
              <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[20px] border-l-black border-b-[10px] border-b-transparent ml-1"></div>
            </div>
          </div>
        </div>
      )}

      {/* Video (hidden until thumbnail is clicked) */}
      {showVideo && (
        <video
          ref={videoRef}
          className="w-full aspect-video "
          controls
          playsInline
        >
          <source src="https://api.wecandeo.com/video?k=BOKNS9AQWrEisuRmtr15XPSMqlX3VngzwdaThCN6cMkef8pF0DvisiiI0hzqIktIt7BzVGZY6WmbCEsOTNlBiiMylgSNEtHBolhkHEe9bJ1RU1jptnIuxXOipIrKGKgfKFPwpHEG8NdddPQV94dCufsRJoQieie&dRate=2.5" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
}

function App() {
  // State to control ticket visibility
  const [showTicket, setShowTicket] = React.useState(false);
  const [isAtBottom, setIsAtBottom] = React.useState(false);
  const [canScroll, setCanScroll] = React.useState(false);

  // Existing useEffect hooks remain unchanged
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".slide-up").forEach((element) => {
      observer.observe(element);
    });

    const checkDate = () => {
      const now = new Date();
      const startDate = new Date("2025-03-14T00:00:00");
      const endDate = new Date("2025-04-18T23:59:59");
      setShowTicket(now >= startDate && now <= endDate);
    };

    checkDate();
    const interval = setInterval(checkDate, 60000);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, []);

  React.useEffect(() => {
    const fireworkGroups = [
      document.querySelector('[alt="fire1"]'),
      [
        document.querySelector('[alt="fire2"]'),
        document.querySelector('[alt="fire_light1"]'),
      ],
      [
        document.querySelector('[alt="fire3"]'),
        document.querySelector('[alt="fire_light2"]'),
      ],
      document.querySelector('[alt="fire4"]'),
    ];

    fireworkGroups.forEach((group) => {
      const randomDelay = 3 + Math.random();
      if (Array.isArray(group)) {
        group.forEach((element) => {
          if (element) {
            element.style.animation = `firework 1s ease-out forwards`;
            element.style.animationDelay = `${randomDelay}s`;
          }
        });
      } else if (group) {
        group.style.animation = `firework 1s ease-out forwards`;
        group.style.animationDelay = `${randomDelay}s`;
      }
    });
  }, []);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const screenNumber = entry.target.getAttribute("data-screen");
            console.log(`Screen ${screenNumber} is visible`);
          }
        });
      },
      { threshold: 0.1 }
    );

    const screens = document.querySelectorAll(".screen1, .screen2, .screen3");
    screens.forEach((screen, index) => {
      screen.setAttribute("data-screen", index + 1);
      observer.observe(screen);
    });

    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    document.body.classList.add("prevent-scroll");
    const timer = setTimeout(() => {
      document.body.classList.remove("prevent-scroll");
      setCanScroll(true);
    }, 12000);

    return () => {
      clearTimeout(timer);
      document.body.classList.remove("prevent-scroll");
    };
  }, []);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsAtBottom(entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );

    const redDiv = document.querySelector(".screen2 > div:last-child");
    if (redDiv) observer.observe(redDiv);

    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      const introElement = document.querySelector(".intro-fade-out");
      if (introElement) introElement.style.display = "none";
    }, 11500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-gray-100 flex flex-col items-center justify-center relative">
      <div className="bg-gray-100 flex flex-col items-center justify-center max-w-[430px] mx-auto">
        <div
          className="screen1 w-full h-[100dvh] p-10 pt-0 relative overflow-hidden intro-fade-out"
          data-screen="1"
        >
          <div className="absolute top-0 left-0 w-full h-[40vh] z-0">
            <img
              src="https://cloud-kr.store/daewon/agora2504/img/screen1/fire1.png"
              alt="fire1"
              className="w-20 h-20 absolute top-[20vh] left-0 firework-animation"
              style={{ "--final-top": "20vh", "--final-width": "80px", "--final-height": "80px" }}
            />
            <img
              src="https://cloud-kr.store/daewon/agora2504/img/screen1/fire2.png"
              alt="fire2"
              className="w-14 h-14 absolute top-[5vh] left-[30%] firework-animation"
              style={{ "--final-top": "5vh", "--final-width": "56px", "--final-height": "56px" }}
            />
            <img
              src="https://cloud-kr.store/daewon/agora2504/img/screen1/fire_light1.png"
              alt="fire_light1"
              className="w-1 h-12 absolute top-[5vh] left-[30%] mt-[50px] ml-[25px] firework-animation"
              style={{ "--final-top": "5vh", "--final-width": "4px", "--final-height": "48px" }}
            />
            <img
              src="https://cloud-kr.store/daewon/agora2504/img/screen1/fire3.png"
              alt="fire3"
              className="w-24 h-24 absolute top-[10vh] -right-[5%] firework-animation"
              style={{ "--final-top": "10vh", "--final-width": "96px", "--final-height": "96px" }}
            />
            <img
              src="https://cloud-kr.store/daewon/agora2504/img/screen1/fire_light2.png"
              alt="fire_light2"
              className="w-8 h-24 absolute top-[10vh] -right-[5%] mr-[30px] mt-[100px] firework-animation"
              style={{ "--final-top": "10vh", "--final-width": "32px", "--final-height": "96px" }}
            />
            <img
              src="https://cloud-kr.store/daewon/agora2504/img/screen1/fire4.png"
              alt="fire4"
              className="w-12 h-12 absolute top-[40vh] right-[10%] firework-animation"
              style={{ "--final-top": "40vh", "--final-width": "48px", "--final-height": "48px" }}
            />
          </div>
          <div className="relative z-10">
            <img src="https://cloud-kr.store/daewon/agora2504/img/screen1/title.png" alt="title" className="w-full mx-auto mt-[12vh]" />
            {showTicket && (
              <img
                src="https://cloud-kr.store/daewon/agora2504/img/screen1/ticket.png"
                alt="ticket"
                className="w-[150px] mx-auto mt-[1vh] ticket_animation"
              />
            )}
          </div>
          <img
            src="https://cloud-kr.store/daewon/agora2504/img/screen1/icon_left.png"
            className="w-[40vw] mx-auto mt-[20vh] absolute -left-[10%] top-[20vh] slide-in-left max-w-[200px] z-50"
            alt="Left decorative icon"
          />
          <img
            src="https://cloud-kr.store/daewon/agora2504/img/screen1/icon_right.png"
            className="w-[30vw] mx-auto mt-[20vh] absolute -right-[10%] top-[20vh] slide-in-right max-w-[160px] z-50"
            alt="Right decorative icon"
          />
          <div className="justify-center items-center flex h-full absolute top-[45vh] md:top-[55vh] w-[95%] mx-auto computer_animation z-50 -ml-[7%] scale-[1.2]">
            <img
              src="https://cloud-kr.store/daewon/agora2504/img/screen1/laptop_top.png"
              alt="laptop top"
              className="max-w-[320px] w-full mx-auto absolute top-[310px] z-50 open_laptop_top"
            />
            <img
              src="https://cloud-kr.store/daewon/agora2504/img/screen1/monitor.png"
              alt="monitor"
              className="max-w-[220px] w-full mx-auto absolute top-[160px] closed_monitor z-50"
            />
            <img
              src="https://cloud-kr.store/daewon/agora2504/img/screen1/monitor_text.png"
              alt="monitor text"
              className="max-w-[220px] w-full mx-auto absolute top-[160px] closed_monitor_text z-50"
            />
            <img
              src="https://cloud-kr.store/daewon/agora2504/img/screen1/laptop_bottom.png"
              alt="laptop bottom"
              className="max-w-[300px] w-full mx-auto absolute top-[300px] z-40"
            />
          </div>


          <div className="absolute bottom-0 left-0 w-full h-10 bg-white flex items-center justify-center z-50">
            <img src="https://cloud-kr.store/daewon/agora2504/img/screen1/logo.png" alt="logo" className="w-1/5 mx-auto" />
          </div>
        </div>
        <div className="screen2 w-full min-h-[100dvh] p-10 pt-0 pb-28 relative overflow-hidden" data-screen="2">
          <img src="https://cloud-kr.store/daewon/agora2504/img/screen2/title.png" alt="title" className="w-full slide-up" />
          <img src="https://cloud-kr.store/daewon/agora2504/img/screen2/subtitle.png" alt="subtitle" className="w-2/3 mx-auto my-[4vh] slide-up" />
          <img
            src="https://cloud-kr.store/daewon/agora2504/img/screen2/icon_left.png"
            className="w-[10vw] mx-auto mt-[10vh] absolute left-[5%] top-[22vh] max-w-[40px] z-50"
            alt="Left decorative icon"
          />
          <img
            src="https://cloud-kr.store/daewon/agora2504/img/screen2/icon_right.png"
            className="w-[15vw] mx-auto mt-[20vh] absolute top-[25%] -right-[5%] max-w-[70px]"
            alt="Right decorative icon"
          />

          <VideoPlayer />
          <VideoPlayerMobile />

          {/* <div className="w-full flex flex-col items-center mb-10 slide-up relative  md:flex hidden">

            <video id="mario-video" controls>
              <source src="https://api.wecandeo.com/video?k=BOKNS9AQWrEisuRmtr15XPSMqlX3VngzwdaThCN6cMkef8pF0DvisiiI0hzqIktIt7BzVGZY6WmbCEsOTNlBiiMylgSNEtHBolhkHEe9bJ1RU1jptnIuxXOipIrKGKgfKFPwpHEG8NdddPQV94dCufsRJoQieie&dRate=2.5" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

          </div> */}
          <div className="flex flex-col items-center relative slide-up blink">
            <a
              href="https://www.dtalks.kr/bbs/boardView.do?bsIdx=40&bIdx=1347&page=1&menuId=3088&bcIdx=0"
              target="_blank"
              rel="noopener noreferrer"
              className="z-50 block"
            >
              <img src="https://cloud-kr.store/daewon/agora2504/img/screen2/btn_top.png" alt="사전신청하러가기" className="w-full my-[4vh]" />
            </a>
          </div>

          <img src="https://cloud-kr.store/daewon/agora2504/img/screen2/lineup_title.png" alt="lineup title" className="w-1/5 mx-auto mb-5 slide-up" />
          <div className="flex flex-col items-center relative slide-up z-40">
            <img src="https://cloud-kr.store/daewon/agora2504/img/screen2/lineup1.png" alt="lineup 1" className="w-full" />
            <a
              href="https://www.dtalks.kr/websim/userLiveView.do?live_idx=814&viewType=live"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-[30%] h-8 absolute bottom-[31%] z-50"
            ></a>
          </div>
          <div className="flex flex-col items-center relative slide-up z-40">
            <img src="https://cloud-kr.store/daewon/agora2504/img/screen2/lineup2.png" alt="lineup 2" className="w-full" />
            <a
              href="https://www.dtalks.kr/websim/userLiveView.do?live_idx=815&viewType=live"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-[30%] h-8 absolute bottom-[31%] z-50"
            ></a>
          </div>
          <div className="flex flex-col items-center relative slide-up z-40">
            <img src="https://cloud-kr.store/daewon/agora2504/img/screen2/lineup3.png" alt="lineup 3" className="w-full" />
            <a
              href="https://www.dtalks.kr/websim/userLiveView.do?live_idx=816&viewType=live"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-[30%] h-8 absolute bottom-[27%] z-50"
            ></a>
          </div>
          <div className="flex flex-col items-center relative slide-up z-40">
            <img src="https://cloud-kr.store/daewon/agora2504/img/screen2/lineup4.png" alt="lineup 4" className="w-full" />
            <a
              href="https://www.dtalks.kr/websim/userLiveView.do?live_idx=817&viewType=live"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-[30%] h-8 absolute bottom-[30%] z-50"
            ></a>
          </div>
          <div className="flex flex-col items-center relative slide-up z-40">
            <img src="https://cloud-kr.store/daewon/agora2504/img/screen2/lineup5.png" alt="lineup 5" className="w-full" />
            <a
              href="https://www.dtalks.kr/websim/userLiveView.do?live_idx=818&viewType=live"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-[30%] h-8 absolute bottom-[24%] z-50"
            ></a>
          </div>
          <div className="flex flex-col items-center relative slide-up mb-20">
            <a
              href="https://www.dtalks.kr/main.do"
              target="_blank"
              rel="noopener noreferrer"
              className="z-50 block w-full flex items-center justify-center"
            >
              <img src="https://cloud-kr.store/daewon/agora2504/img/screen2/btn_bottom.png" alt="디톡스로 이동하기" className="w-full" />
            </a>
          </div>
          <div className="w-full h-32"></div>
          <div className="w-full h-4"></div>
        </div>
        <div
          className={`screen3 w-full max-w-[430px] mx-auto h-[100dvh] fixed top-0 p-10 pt-0 overflow-hidden flex flex-col items-center justify-center screen3-popup z-50 ${isAtBottom ? "show" : ""}`}
          data-screen="3"
        >
          <img src="https://cloud-kr.store/daewon/agora2504/img/screen3/cont.png" alt="cont" className="w-full slide-up" />
          <div className="text-center text-[7px] text-white mt-10 absolute bottom-[5vh]">
            <p>
              <span className="font-bold">대웅제약</span> | 04808 서울특별시 성동구 천호대로 386
            </p>
            <p>TEL (02)2204-7000 (수신자부담) 080-492-8272 FAX (02)3436-4878 www.daewoongpharm.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function VideoPlayerMobile() {
  const videoRef = React.useRef(null);
  const [isAndroid, setIsAndroid] = React.useState(false);

  // Add device detection in useEffect
  React.useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    setIsAndroid(/android/i.test(userAgent));
  }, []);

  // Add goFullscreen function
  const goFullscreen = () => {
    const video = document.getElementById('myVideo');
    if (video) {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen();
      } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
      } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen();
      }
      video.play(); // Auto-play when entering fullscreen
    }
  };

  // Add click event listeners in useEffect
  React.useEffect(() => {
    if (isAndroid) {
      const thumbnail = document.querySelector('.thumbnail');
      const fullscreenBtn = document.getElementById('fullscreenBtn');

      if (thumbnail) thumbnail.addEventListener('click', goFullscreen);
      if (fullscreenBtn) fullscreenBtn.addEventListener('click', goFullscreen);

      // Cleanup
      return () => {
        if (thumbnail) thumbnail.removeEventListener('click', goFullscreen);
        if (fullscreenBtn) fullscreenBtn.removeEventListener('click', goFullscreen);
      };
    }
  }, [isAndroid]);

  // Android-specific render
  if (isAndroid) {
    return (
      <div className="w-full flex flex-col items-center mb-10 slide-up relative video-background md:hidden">
        <div className="video-container" style={{ maxWidth: 0, maxHeight: 0, visibility: 'hidden' }}>
          <video
            id="myVideo"
            ref={videoRef}
            controls
            style={{ maxWidth: 0, maxHeight: 0, visibility: 'hidden' }}
          >
            <source src="https://api.wecandeo.com/video?k=BOKNS9AQWrEisuRmtr15XPSMqlX3VngzwdaThCN6cMkef8pF0DvisiiI0hzqIktIt7BzVGZY6WmbCEsOTNlBiiMylgSNEtHBolhkHEe9bJ1RU1jptnIuxXOipIrKGKgfKFPwpHEG8NdddPQV94dCufsRJoQieie&dRate=2.5" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <button
          id="fullscreenBtn"
          className="relative cursor-pointer w-full"
          onClick={goFullscreen}
        >
          <img
            className="thumbnail w-full h-full object-cover"
            src="https://assets.playnccdn.com/res/lineagem/update/2024/240529_update/4th/pc/img/section15/898da534d906bcd0539af941045554fbd78682dc.webp"
            alt="Video Thumbnail"
          />
          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center">
              <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[20px] border-l-black border-b-[10px] border-b-transparent ml-1"></div>
            </div>
          </div>
        </button>
      </div>
    );
  }

  // Non-Android render
  return (
    <div>
      <div className="w-full flex flex-col items-center mb-10 slide-up relative video-background md:hidden">
        <video
          ref={videoRef}
          className="w-full aspect-video cursor-pointer"
          controls
          onClick={goFullscreen}
        >
          <source src="https://api.wecandeo.com/video?k=BOKNS9AQWrEisuRmtr15XPSMqlX3VngzwdaThCN6cMkef8pF0DvisiiI0hzqIktIt7BzVGZY6WmbCEsOTNlBiiMylgSNEtHBolhkHEe9bJ1RU1jptnIuxXOipIrKGKgfKFPwpHEG8NdddPQV94dCufsRJoQieie&dRate=2.5" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));





