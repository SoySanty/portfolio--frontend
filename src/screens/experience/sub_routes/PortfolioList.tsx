import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPortfolioList } from "state/actions";
import getPortfolio from "scripts/getPortfolio";
import WorkArticle from "components/common/work_article";
import useSwitchModal from "components/hooks/experience/useSwitchModal";
import type { Work } from "typescript/work";
import WorkModal from "components/common/work_modal";

const PortfolioList = () => {
  //Modal data (useSwitchModal)
  const { closeModal, showModal, modalData, modalStatus } = useSwitchModal();

  //Using Redux
  const portfolioList: Work[] = useSelector(
    (state: any) => state.works.portfolio
  );
  const dispatch = useDispatch();

  //Call API
  useEffect(() => {
    if (!portfolioList.length) {
      getPortfolio().then((res: any): void => {
        dispatch(setPortfolioList(res));
      });
    }
  }, [dispatch, portfolioList.length]);

  return (
    <>
      {modalStatus && <WorkModal {...modalData} onClick={closeModal} />}
      {!!portfolioList &&
        portfolioList.map((item: Work, index: number) => (
          <WorkArticle {...item} key={index} onClick={() => showModal(item)} />
        ))}
    </>
  );
};

export default PortfolioList;