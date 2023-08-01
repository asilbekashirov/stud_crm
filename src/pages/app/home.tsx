import { user } from "../../demo/account";
import { faker } from "@faker-js/faker";
import { useAppSelector } from "../../hooks/redux";
import TodoItem from "../../components/todo/TodoItem";
import Slideshow from "../../components/slideshow/Slideshow";
import Card from "../../components/card/Card";

const HomePage = () => {
  const isAuth = useAppSelector((state) => state.app.isAuth);

  return (
    <div className="flex flex-col">
      <div className="w-full h-80 rounded-xl bg-slate-200 flex justify-center items-center relative overflow-hidden">
        <Slideshow
          images={[faker.image.urlLoremFlickr({ category: 'business' }), faker.image.urlLoremFlickr({ category: 'business' })]}
        />
      </div>
      <div className="w-full flex md:flex-row flex-col justify-between md:gap-3 gap-1 mt-3">
        <Card className="w-full h-80 flex justify-center items-center">
          News archive...
        </Card>
        <Card className="w-full h-80">
          <h4 className="text-center text-3xl font-bold">Waiting tasks...</h4>
          <div className="flex flex-col">
            {isAuth ? (
              user.todo.map((todo, index) => (
                <TodoItem {...todo} index={index} key={todo.text} />
              ))
            ) : (
              <p className="text-center mt-5">To see the list of tasks, you must be authorized first</p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default HomePage;
