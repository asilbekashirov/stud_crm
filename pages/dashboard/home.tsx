import TodoItem from "@/components/todo/TodoItem";
import { user } from "@/demo/account";
import { useAppSelector } from "@/hooks/redux";
import { faker } from "@faker-js/faker";

const HomePage = () => {
  const isAuth = useAppSelector((state) => state.app.isAuth);

  return (
    <div className="flex flex-col">
      <div className="w-full h-80 rounded-xl bg-slate-200 flex justify-center items-center relative">
        <img
          src={faker.image.business()}
          alt="Main"
          className="rounded-xl object-cover w-full h-full"
        />
        <div className="absolute rounded-b-xl w-full h-full bg-gradient-to-b from-transparent to-black">
          <h3 className="absolute bottom-3 left-3 text-slate-300 text-lg">
            {faker.lorem.lines(2)}
          </h3>
        </div>
      </div>
      <div className="w-full flex justify-between gap-3 mt-3">
        <div className="w-full h-80 rounded-xl bg-slate-100 border-solid border-gray-500 border flex justify-center items-center">
          News archive...
        </div>
        <div className="w-full p-3 h-80 rounded-xl bg-slate-100 border-solid border-gray-500 border">
          <h4 className="text-center text-xl font-bold">Waiting tasks...</h4>
          <div className="flex flex-col">
            {isAuth ? (
              user.todo.map((todo, index) => (
                <TodoItem {...todo} index={index} key={todo.text} />
              ))
            ) : (
              <p className="text-center mt-5">To see the list of tasks, you must be authorized first</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
