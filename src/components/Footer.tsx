const Footer = () => {
  return (
    <footer>
      <div className="h-[65px] border-y-[1px] flex flex-row items-center">
        <div className="text-[13px] pr-[25px] after-bar-footer">회사소개</div>
        <div className="text-[13px] px-[25px] after-bar-footer">이용약관</div>
        <div className="text-[13px] px-[25px] after-bar-footer">운영정책</div>
        <div className="text-[13px] px-[25px] font-bold after-bar-footer">
          개인정보처리방침
        </div>
        <div className="text-[13px] px-[25px] after-bar-footer">
          청소년보호정책
        </div>
        <div className="text-[13px] px-[25px]">광고제휴</div>
      </div>
      <div className="mt-[40px] mb-[45px]">
        <div className="grid grid-col-2">
          <div className="col-start-1 col-end-2 row-start-1 row-end-2">
            <div>
              <p>번개장터(주) 사업자정보</p>
              <p>대표이사 : 최재화, 강승현 | 개인정보보호책임자 : 박병성</p>
              <p>
                사업자등록번호 : 113-86-45836 | 통신판매업신고 :
                2019-서울서초-1126
              </p>
              <p>호스팅서비스 제공자 : Amazon Web Services (AWS)</p>
              <p>EMAIL : help@bunjang.co.kr | FAX : 02-598-8241</p>
              <p>
                주소 : 서울특별시 서초구 서초대로 38길 12, 7, 10층(서초동,
                마제스타시티, 힐스테이트 서리풀)
              </p>
              <p>사업자정보 확인</p>
            </div>
            <div>
              <p>번개장터(주)더현대서울점 | 최재화, 강승현 | 365-85-01581</p>
              <p>서울특별시 영등포구 여의대로 108, 지하2층(여의도동, 파크원)</p>
              <p>번개장터(주)코엑스점 | 최재화, 강승현 | 142-85-27412</p>
              <p>
                서울특별시 강남구 영동대로 513, 쇼핑몰동 B1층 C102호(삼성동,
                코엑스)
              </p>
              <p>번개장터(주)센터필드점 | 최재화, 강승현 | 808-85-01905</p>
              <p>
                서울특별시 강남구 테헤란로 231, 쇼핑몰동 1층
                W124호(역삼동)(역삼동, 센터필드)
              </p>
            </div>
          </div>
          <div className="col-start-2 col-end-3 row-start-1 row-end-2">
            <div>
              <p>고객센터</p>
              <p>1670-2910</p>
              <p>
                운영시간 9시 - 18시 (주말/공휴일 휴무, 점심시간 12시 - 13시)
              </p>
              <div className="flex">
                <div>공지사항</div>
                <div>1:1 문의하기</div>
                <div>자주 묻는 질문</div>
              </div>
            </div>
            <div>
              <p>우리은행 채무지급보증 안내</p>
              <p>
                번개장터㈜는 회사가 직접 판매하는 상품에 한하여, 고객님의 현금
                결제 금액에 대해 우리은행과 채무지급보증 계약을 체결하여
                안전거래를 보장하고 있습니다.
              </p>
              <p>서비스 가입사실 확인</p>
              <p>Ⓒ Bungaejangter. Inc All rights reserved.</p>
            </div>
          </div>
          <hr className="col-start-1 col-end-3 row-start-2 row-end-3" />
          <div className="col-start-1 col-end-2 row-start-3 row-end-4">
            <div className="flex flex-row align-top justify-start h-[33px]">
              <img
                src="https://m.bunjang.co.kr/pc-static/resource/ee757469a142ab4f2f48.png"
                width="31px"
                height="28px"
                className="object-contain mr-[16px]"
              />
              <div className="h-full flex flex-col justify-between">
                <p className="text-[11px] text-[#999999] m-0">
                  [인증범위] 번개장터 중고거래 플랫폼 서비스 운영(심사받지 않은
                  물리적 인프라 제외)
                </p>
                <p className="text-[11px] text-[#999999] m-0">
                  [유효기간] 2021.05.18 ~ 2024.05.17
                </p>
              </div>
            </div>
          </div>
          <div className="col-start-2 col-end-2 row-start-3 row-end-4 text-[11px] text-[#999999]">
            번개장터㈜는 통신판매중개자이며, 통신판매의 당사자가 아닙니다.
            전자상거래 등에서의 소비자보호에 관한 법률 등 관련 법령 및
            번개장터㈜의 약관에 따라 상품, 상품정보, 거래에 관한 책임은 개별
            판매자에게 귀속하고, 번개장터㈜는 원칙적으로 회원간 거래에 대하여
            책임을 지지 않습니다. 다만, 번개장터㈜가 직접 판매하는 상품에 대한
            책임은 번개장터㈜에게 귀속합니다.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
