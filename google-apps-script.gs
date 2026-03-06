/**
 * Google Apps Script - Skymate Form Backend
 *
 * 사용 방법:
 * 1. Google Sheets에서 [확장 프로그램] > [Apps Script]를 클릭합니다.
 * 2. 아래 코드를 전체 복사하여 붙여넣습니다.
 * 3. SPREADSHEET_ID를 실제 구글 시트 ID로 교체합니다.
 *    (시트 URL: https://docs.google.com/spreadsheets/d/{SPREADSHEET_ID}/edit)
 * 4. [배포] > [새 배포]를 클릭합니다.
 * 5. 유형: '웹 앱', 실행 사용자: '나', 액세스 권한: '모든 사용자'로 설정합니다.
 * 6. 배포 후 생성된 URL을 프론트엔드의 GOOGLE_SCRIPT_URL에 붙여넣습니다.
 */

const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE';
const SHEET_NAME = '신청목록';

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    var sheet = ss.getSheetByName(SHEET_NAME);

    // 시트가 없으면 새로 생성하고 헤더 추가
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      var headers = [
        '제출일시',
        '이름',
        '성별',
        '전화번호',
        '학년',
        '학습고민',
        '성적/목표',
        '자습시간',
        '코칭시작일',
        '결제마감일',
        '멘토배정일',
        '컨설팅날짜',
        '상담희망1순위',
        '상담희망2순위',
        '상담희망3순위'
      ];
      sheet.appendRow(headers);

      // 헤더 스타일링
      var headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#4facfe');
      headerRange.setFontColor('#ffffff');
      sheet.setFrozenRows(1);
    }

    // 데이터 행 추가
    var row = [
      data.submittedAt || new Date().toISOString(),
      data.name || '',
      data.gender || '',
      data.phone || '',
      data.grade || '',
      data.concern || '',
      data.gradeAndGoal || '',
      data.studyHours || '',
      data.startDate || '',
      data.paymentDeadline || '',
      data.mentorAssignDate || '',
      data.consultingDate || '',
      data.consultation1 || '',
      data.consultation2 || '',
      data.consultation3 || ''
    ];

    sheet.appendRow(row);

    // 열 너비 자동 조정 (최초 10행 이내일 때만)
    if (sheet.getLastRow() <= 2) {
      sheet.autoResizeColumns(1, row.length);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success', message: '신청이 접수되었습니다.' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', message: 'Skymate API is running.' }))
    .setMimeType(ContentService.MimeType.JSON);
}
