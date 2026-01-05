# Netlify 배포 가이드 (초보자용)

이 가이드는 작성하신 "Human Index Scanner"를 전 세계 사람들이 접속할 수 있도록 **Netlify**에 배포하는 방법을 단계별로 설명합니다.

## 0단계: Git 설치하기 (필수)
컴퓨터에 `git` 명령어가 없어서 먼저 설치를 해야 합니다.
1.  **[Git for Windows 다운로드](https://git-scm.com/download/win)** 링크를 클릭하여 설치 파일을 다운로드합니다.
    - "Click here to download"를 누르세요.
2.  설치 프로그램을 실행하고, 나오는 모든 옵션에서 **"Next"**만 계속 눌러서 설치를 완료합니다.
3.  설치가 끝나면 **VS Code를 껐다가 다시 켜주세요** (그래야 설치된 Git을 인식합니다).
4.  새 터미널을 열고 `git --version`을 입력했을 때 버전 정보가 나오면 성공입니다.

## 1단계: GitHub에 코드 올리기
Netlify는 GitHub에 저장된 코드를 가져와서 자동으로 배포합니다.

1.  **GitHub 저장소 생성**:
    - [GitHub](https://github.com)에 로그인합니다.
    - 우측 상단 `+` 버튼 -> **New repository** 클릭.
    - Repository name에 `human-index-scanner` 입력 -> **Create repository** 클릭.

2.  **내 컴퓨터의 코드를 GitHub로 보내기**:
    - VS Code 터미널을 엽니다 ( `Ctrl` + `~` ).
    - 아래 명령어들을 순서대로 입력하세요 (한 줄씩):
      ```bash
      git init
      git add .
      git commit -m "Initial commit"
      git branch -M main
      git remote add origin https://github.com/YOUR_USERNAME/human-index-scanner.git
      # (위 주소는 방금 만든 GitHub 저장소 주소로 바꿔주세요)
      git push -u origin main
      ```

## 2단계: Netlify와 GitHub 연결하기
1.  [Netlify](https://www.netlify.com)에 가입/로그인합니다.
2.  대시보드에서 **"Add new site"** -> **"Import from an existing project"**를 클릭합니다.
3.  **"Deploy with GitHub"**를 선택합니다.
4.  방금 만든 `human-index-scanner` 저장소를 선택합니다.

## 3단계: 배포 설정 및 환경변수 등록 (★중요★)
가장 중요한 단계입니다. 우리가 만든 앱은 `GEMINI_API_KEY`가 없으면 작동하지 않습니다.

1.  **Build settings** 화면이 나오면 기본값 그대로 둡니다:
    - **Base directory**: (비워둠)
    - **Build command**: `npm run build`
    - **Publish directory**: `dist`
2.  **"Add environment variables"** 버튼을 찾아서 클릭합니다 (또는 "Show advanced"를 눌러 찾습니다).
3.  **New Variable**을 추가합니다:
    - **Key**: `GEMINI_API_KEY`
    - **Value**: (기존에 발급받은 실제 Gemini API 키를 복사해서 붙여넣으세요)
4.  **"Deploy human-index-scanner"** 버튼을 클릭합니다.

## 4단계: 완료 확인
1.  Netlify가 자동으로 사이트를 빌드하고 배포합니다 (약 1~2분 소요).
2.  배포가 끝나면 상단에 `https://random-name-12345.netlify.app` 같은 주소가 생깁니다.
3.  클릭해서 들어가보세요! 이제 친구들에게 링크를 공유할 수 있습니다.

---

### 로컬 테스트 (netlify-cli) 관련 설명
방금 겪으신 오류(`npm : 이 시스템에서...`)는 윈도우 보안 정책 때문에 발생한 것입니다. 제가 백그라운드에서 해결 명령어를 실행해 두었으니, 잠시 후 다시 시도해보시거나 아래 명령어를 직접 입력해보세요:
```cmd
cmd /c "netlify dev"
```
하지만 **배포가 목적이라면** 로컬 테스트(netlify-cli)는 건너뛰고 바로 1단계(GitHub 올리기)부터 진행하셔도 됩니다. 로컬에서는 `npm run dev`만으로도 충분히 화면 확인이 가능합니다 (단, AI 분석 기능은 백엔드 연결이 필요하여 로컬에서 `netlify dev` 없이 `npm run dev`만으로는 에러가 날 수 있습니다).
