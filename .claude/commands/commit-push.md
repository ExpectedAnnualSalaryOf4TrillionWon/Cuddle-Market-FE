# Git 이슈 생성 → 브랜치 생성 → 커밋 → 푸시

프로젝트 컨벤션에 맞춰 이슈를 생성하고, 브랜치를 만들고, 커밋한 뒤 푸시합니다.

**중요**: 이 명령어는 푸시 및 PR 생성까지 수행합니다. 머지는 사용자가 직접 GitHub에서 진행합니다.

## 📌 컨벤션 참고
- 브랜치: `docs/conventions.md` (브랜치 컨벤션, 커밋 컨벤션)
- 이슈 템플릿: `.github/ISSUE_TEMPLATE/`
  - `feature_request.md` - 기능 구현
  - `refactor-issue.md` - 리팩토링
  - `docs-issue.md` - 문서 작업

---

## 🔄 작업 순서

### Step 1: 변경사항 분석
다음 명령어들을 **병렬로** 실행:
```bash
git status
git diff
git log -5 --oneline
```

변경사항을 분석하여:
- 작업 타입 파악 (feature/fix/refactor/docs/chore 등)
- 무엇을 변경했는지 파악
- 왜 변경했는지 파악

### Step 2: 이슈 내용 작성

사용자에게 **이슈 타입 확인**:
- "어떤 타입의 이슈인가요? (feature/refactor/docs)"

해당 템플릿에 맞춰 이슈 내용 작성:

#### Feature (기능 구현)
```markdown
## ✨ 제안 개요
[간단한 기능 설명]

## 🛠 작업 내용
- [ ] [작업 1]
- [ ] [작업 2]

## 📌 참고 자료 (선택)
[관련 자료가 있다면]
```

#### Refactor (리팩토링)
```markdown
## ♻️ 리팩토링 대상
[대상 코드/컴포넌트]

## 📌 개선 이유
[리팩토링이 필요한 이유]

## 🛠 기대 결과
[리팩토링 후 기대 효과]
```

#### Docs (문서)
```markdown
## 📄 문서 작업 개요
[문서 작업 설명]

## 📌 범위
- [ ] README
- [ ] Wiki
- [ ] 주석

## 작업 내용 요약
[정리할 내용]
```

**사용자에게 이슈 내용 보여주고 확인 받기**:
- "다음 내용으로 GitHub 이슈를 생성하시겠습니까?"
- 이슈 내용 전체 표시

### Step 3: GitHub 이슈 생성

`gh` CLI 사용하여 이슈 생성:
```bash
gh issue create --title "타입: 제목" --body "$(cat <<'EOF'
이슈 내용
EOF
)" --label "라벨"
```

**라벨 매핑**:
- feature → FEAT
- refactor → REFECTOR
- docs → DOCS
- fix → FIX
- chore → CHORE

이슈 번호 저장 (예: #123)

### Step 4: 브랜치 생성

**중요**: 모든 새 브랜치는 반드시 **develop 브랜치에서** 생성합니다.

**브랜치 컨벤션**: `종류/이슈번호--브랜치이름` (전부 소문자)

사용자에게 브랜치 이름 확인:
- "브랜치 이름: `타입/#이슈번호--제안된이름`"
- 제안된 이름은 변경사항 기반으로 자동 생성
- 예: `feature/123--login-ui`

develop 브랜치로 이동 및 최신화 후 브랜치 생성:
```bash
git checkout develop
git pull origin develop
git checkout -b 브랜치명
```

### Step 5: 커밋 메시지 작성

**커밋 컨벤션**: `타입: 한글 내용(#이슈번호)`

커밋 타입:
- feat, fix, refactor, design, style, test, chore, init, rename, remove, docs

예시: `feat: 로그인 ui 작업(#32)`

**사용자에게 커밋 메시지 확인**:
- "다음 내용으로 커밋하시겠습니까?"
- 커밋 메시지 표시

### Step 6: 파일 스테이징 및 커밋

**중요**: 민감한 파일 제외
- `.env`, `credentials.json`, `.DS_Store` 등 제외 확인

관련 파일만 스테이징:
```bash
git add [파일들]
```

커밋 생성:
```bash
git commit -m "타입: 한글 내용(#이슈번호)"
```

커밋 후 상태 확인:
```bash
git status
```

### Step 7: 원격 저장소에 푸시

**사용자에게 푸시 확인**:
- "원격 저장소에 푸시하시겠습니까?"

첫 푸시인 경우 `-u` 플래그 사용:
```bash
git push -u origin 브랜치명
```

이후 푸시:
```bash
git push
```

### Step 8: PR 생성

푸시가 성공적으로 완료되면 PR을 생성합니다.

**사용자에게 PR 생성 확인**:
- "PR을 생성하시겠습니까?"

PR 생성:
```bash
gh pr create --base develop --title "타입: 제목(#이슈번호)" --body "$(cat <<'EOF'
## 작업 내용
- 변경사항 요약

## 관련 이슈
- closes #이슈번호
EOF
)"
```

### Step 9: 완료 안내

PR 생성이 완료되면 사용자에게 다음 안내 메시지 표시:

```
✅ PR 생성 완료!

📌 다음 단계:
- 코드 리뷰 및 머지는 직접 진행해주세요

이슈: #[이슈번호]
브랜치: [브랜치명]
PR: [PR URL]
```

**중요**: 머지는 사용자가 직접 GitHub에서 수행합니다.

---

## ⚠️ 주의사항

### 커밋 전 체크리스트
- [ ] `.env`, `credentials.json` 등 민감 파일 제외
- [ ] 불필요한 파일 제외 (node_modules, .DS_Store 등)
- [ ] 커밋 타입이 올바른지 확인
- [ ] 이슈 번호가 포함되었는지 확인
- [ ] 한글로 작성되었는지 확인

### 브랜치 네이밍
- 반드시 **소문자**
- 형식: `종류/이슈번호--이름`
- 예: `feature/24--modal-ui`, `fix/45--button-click-bug`

### Pre-commit Hook 처리
1. 커밋 실패 시 hook이 파일을 수정했는지 확인
2. 수정된 경우 재커밋 또는 amend

### 금지 사항
- `--no-verify` 플래그 사용 금지 (사용자 명시 요청 시만)
- force push 절대 금지
- main/master에 직접 커밋 금지

---

## 📊 전체 워크플로우 요약

### 🤖 자동화 범위 (이 명령어가 수행)
1. **변경사항 분석** (git status, git diff)
2. **이슈 타입 확인** (feature/refactor/docs)
3. **이슈 내용 작성** (템플릿 기반)
4. **GitHub 이슈 생성** (gh issue create)
5. **브랜치 생성** (develop에서 타입/번호--이름)
6. **커밋 메시지 작성** (타입: 내용(#번호))
7. **파일 스테이징** (git add)
8. **커밋** (git commit)
9. **푸시** (git push -u origin 브랜치명)
10. **PR 생성** (gh pr create)
11. **완료 안내** (머지 안내)

### 👤 사용자가 직접 수행
12. **코드 리뷰 및 머지**

---

## 💡 사용자 인터랙션

각 단계마다 사용자 확인:
1. "어떤 타입의 이슈인가요? (feature/refactor/docs)"
2. "다음 내용으로 GitHub 이슈를 생성하시겠습니까?" + 이슈 내용 표시
3. "브랜치 이름: `제안된브랜치명` - 맞습니까?"
4. "다음 내용으로 커밋하시겠습니까?" + 커밋 메시지 표시
5. "원격 저장소에 푸시하시겠습니까?"
6. "PR을 생성하시겠습니까?"
7. (PR 생성 완료 후) "코드 리뷰 및 머지는 직접 진행해주세요" 안내 표시
