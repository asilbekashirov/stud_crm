import api from "../../api/news";
import NewsCard from "../../components/news/NewsCard";
import { useQuery } from "@tanstack/react-query";

const NewsPage = () => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["news"],
    queryFn: () => api.getNews(),
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="flex flex-col w-4/5">
      {data?.data.length ? (
        data?.data?.map((news) => <NewsCard key={news._id} {...news} />)
      ) : (
        <div className="grid w-full h-full place-items-center">
          <p className="text-slate-500">No news created yet...</p>
        </div>
      )}
    </div>
  );
};

export default NewsPage;
