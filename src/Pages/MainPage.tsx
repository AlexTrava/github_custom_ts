import Header from "../components/Header/Header.tsx";
import ProfileCard from "../components/ProfileCard/ProfileCard.tsx";
import { ItemsFetch, fetchUser } from "../redux/slices/fetchSlice.ts";
import { fetchRepo } from "../redux/slices/fetchRepoSlice.ts";
import { useEffect } from "react";
import Pagination from "../components/Pagination/Pagination.tsx";
import WelcomeText from "../components/StartText/WelcomeText.tsx";
import { useAppDispatch, useAppSelector } from "../redux/store.ts";

const MainPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const searchValue = useAppSelector((state) => state.search.searchValue);
  const { repos, userName }: ItemsFetch = useAppSelector(
    (state) => state.fetch.items
  );
  const repositories = useAppSelector((state) => state.fetchRepo.items);

  const getInfoUser = async () => {
    dispatch(fetchUser(searchValue));
  };

  const gerRepoUser = async () => {
    dispatch(fetchRepo(userName));
  };

  useEffect(() => {
    getInfoUser();
  }, [searchValue]);

  useEffect(() => {
    gerRepoUser();
  }, [userName]);

  return (
    <>
      <header className="header">
        <Header />
      </header>
      {repositories.length === 0 ? (
        <WelcomeText />
      ) : (
        <section className="middle_content center">
          <ProfileCard />
          <div className="info_repos">
            <h2 className="h_repositories">Repositories ({repos})</h2>
            <Pagination repositories={repositories} />
          </div>
        </section>
      )}
    </>
  );
};

export default MainPage;
