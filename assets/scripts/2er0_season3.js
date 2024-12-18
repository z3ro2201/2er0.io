document.addEventListener("DOMContentLoaded", () => {
  const detectLanguage = () => {
    const lang = navigator.language.split("-")[0] || "en";
    if (lang === "ko" || lang === "ja") {
      return lang; // 한국어와 일본어는 그대로 반환
    }
    return "en"; // 그 외는 기본적으로 영어 반환
  };

  let player;
  let onMouseDetected = false;
  const siteVer = "SEASON 3";
  document.getElementById("siteVer").textContent = siteVer;

  const mobileMenuButton = document.getElementById("topNavBar_mobileButton");
  const allNavLinks = document.querySelectorAll(".navTabLink");
  const home = document.getElementById("home");
  const profile = document.getElementById("profile");

  const playerControl = (e) => {
    const icon = document.querySelector("#playerControl i");
    if (!onMouseDetected) {
      player.playVideo();
      icon.classList.replace("fa-play", "fa-pause");
      onMouseDetected = true;
    } else {
      player.stopVideo();
      icon.classList.replace("fa-pause", "fa-play");
      onMouseDetected = false;
    }
  };

  const setDocumentTitle = () => {
    const titles = {
      ko: "2ERO - 처음부터 다시 시작하다",
      en: "2ERO - Start all over again",
      jp: "2ERO - ゼロから再び始める",
    };

    const frontMessages = {
      ko: "아래 재생버튼(▶)을 누르시면, 배경음악이 재생됩니다.",
      en: "Click the play button (▶) below to play background music.",
      ja: "下の再生ボタン（▶）を押すと、BGMが再生されます。",
    };

    const socialLinks = {
      ko: {
        home: "첫화면",
        simpleProfile: "프로필",
        blog: "블로그",
        github: "GitHub",
        instagram: "인스타그램",
        player: "재생",
      },
      en: {
        home: "Home",
        simpleProfile: "Profile",
        blog: "Blog",
        github: "GitHub",
        instagram: "Instagram",
        player: "Play",
      },
      ja: {
        home: "ホーム",
        simpleProfile: "プロフィール",
        blog: "ブログ",
        github: "GitHub",
        instagram: "Instagram",
        player: "音楽をプレイ",
      },
    };

    const profiles = {
      ko: {
        siteTitle: "2ERO",
        siteDescription: "현생에서 고통받는 인간",
        nameTitle: "별명",
        name: "컴맹",
        gameNameTitle: "로스트아크 별명",
        gameName: "자유를향한외침",
        emailTitle: "전자우편",
        email: "hello@2er0.io",
        githubTitle: "GitHub",
        github: "z3r02201",
        programLanguageTitle: "기술",
        programLanguage: "JavaScript, CSS, PHP",
      },
      en: {
        siteTitle: "2ERO",
        siteDescription: "A person suffering in this life",
        nameTitle: "Nickname",
        name: "컴맹(ko)",
        gameNameTitle: "Game Nickname",
        gameName: "자유를향한외침(ko, lostark)",
        emailTitle: "email",
        email: "hello@2er0.io",
        githubTitle: "GitHub",
        github: "z3ro2201",
        programLanguageTitle: "stack",
        programLanguage: "JavaScript, CSS, PHP",
      },
      ja: {
        siteTitle: "ゼロ",
        siteDescription: "現世で苦しむ人間",
        nameTitle: "あだ名",
        name: "컴맹(ko)",
        gameNameTitle: "ゲームネーム",
        gameName: "자유를향한외침(ko, lostark)",
        emailTitle: "メール",
        email: "hello@2er0.io",
        githubTitle: "GitHub",
        github: "z3ro2201",
        programLanguageTitle: "テックスタック",
        programLanguage: "JavaScript, CSS, PHP",
      },
    };

    document.title = titles[detectLanguage()] || "2ERO - Default Title";
    document.querySelector(".front-message").textContent = frontMessages[detectLanguage()] || "준비중";

    const currentLinks = socialLinks[detectLanguage()];
    document.querySelectorAll("[sociallink]").forEach((item) => {
      const key = item.dataset.id;
      if (currentLinks[key]) {
        item.dataset.title = currentLinks[key];
        if (item.classList.contains("navTabLink")) item.textContent = currentLinks[key];
        document.documentElement.style.setProperty(`--${key}-title`, `"${currentLinks[key]}"`);
      }
    });

    const profileData = profiles[detectLanguage()];
    document.querySelectorAll("[profile]").forEach((item) => {
      const key = item.dataset.id;
      if (profileData[key]) {
        item.textContent = profileData[key];
      }
    });
  };

  const playerDiv = document.createElement("div");
  playerDiv.id = "youtube-player";
  document.body.append(playerDiv);

  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  const firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  window.onYouTubeIframeAPIReady = () => {
    player = new YT.Player("youtube-player", {
      width: "320",
      height: "180",
      videoId: "NIHZS7azvU4",
      playerVars: {
        autoplay: 0,
        mute: 0,
        rel: 0,
        controls: 0,
      },
    });
  };

  document.addEventListener("click", (event) => {
    const target = event.target;

    // closest()를 사용해 dataset.id가 있는 가장 가까운 부모 요소 찾기
    const button = target.closest("[data-id]") || target.closest("#topNavBar_mobileButton");

    if (!button) return; // data-id가 없는 경우 함수 종료

    const id = button.dataset.id;
    const topNavBar = document.getElementById("topNavBar");

    // 프로필로 이동
    if (id === "simpleProfile") {
      home.style.transform = "translateX(-100%)";
      profile.style.transform = "translateX(0)";
      topNavBar.style.transform = "translateX(0)";
      topNavBar.classList.add("active");
      mobileMenuButton.classList.add("active");

      allNavLinks.forEach((item) => {
        item.classList.remove("active");

        if (item.dataset.id === "simpleProfile") {
          item.classList.add("active");
        }
      });
    }

    // 홈으로 돌아가기
    else if (id === "home") {
      home.style.transform = "translateX(0)";
      profile.style.transform = "translateX(100%)";
      topNavBar.style.transform = "translateX(100%)";
      topNavBar.classList.remove("active");
      mobileMenuButton.classList.remove("active");

      if (topNavBar.dataset.mobile === "true") {
        topNavBar.dataset.mobile = "false";
      }

      allNavLinks.forEach((item) => {
        item.classList.remove("active");

        if (item.dataset.id === "home") {
          item.classList.add("active");
        }
      });
    }

    // 플레이어 재생 여부
    else if (id === "player") {
      playerControl();
    }
    if (target.classList.contains("navTabLink")) {
      // 모든 .navTabLink 요소에 대해 반복
      allNavLinks.forEach((item) => {
        item.classList.remove("active");

        if (item.dataset.id === target.dataset.id) {
          item.classList.add("active");
        }
      });
    }

    if (target.id === "topNavBar_mobileButton") {
      const mobileMenu = document.getElementById("topNavBar");
      mobileMenu.classList.toggle("active");

      if (mobileMenu.dataset.mobile === "true") {
        mobileMenu.dataset.mobile = "false";
      } else {
        mobileMenu.dataset.mobile = "true";
      }
    }
  });

  setDocumentTitle();
});
