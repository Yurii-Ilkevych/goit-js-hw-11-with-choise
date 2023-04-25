export { activeBtnLoadMore, dissActiveBtnLoadMore };
import { refs, radioScroll } from "./index";

const activeBtnLoadMore = () => {
  if(radioScroll){
    //console.log("dissActiveBtnLoadMore")
    dissActiveBtnLoadMore()
    return
  }
  //console.log("activeBtnLoadMore")
  refs.btnLoadMore.classList.remove('is-hidden');
};
const dissActiveBtnLoadMore = () => {
  refs.btnLoadMore.classList.add('is-hidden');
};
