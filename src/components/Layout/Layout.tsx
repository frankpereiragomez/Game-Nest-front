import { Outlet, useLocation } from "react-router-dom";
import Header from "../Header/Header";
import GeneralContainerStyled from "../shared/GeneralContainerStyled";
import NavBar from "../NavBar/NavBar";
import { useAppSelector } from "../../store";
import Loading from "../Ui/Loading/Loading";
import UserFeedback from "../Ui/UserFeedback/UserFeedback";

const Layout = (): React.ReactElement => {
  const { pathname } = useLocation();
  const isLoading = useAppSelector((state) => state.ui.isLoading);

  return (
    <>
      <UserFeedback feedback={{ message: "Yeeiiiiii" }} />
      {isLoading && <Loading />}
      <Header />
      <GeneralContainerStyled className="body-container">
        <Outlet />
      </GeneralContainerStyled>
      {pathname !== "/login" && <NavBar />}
    </>
  );
};

export default Layout;
