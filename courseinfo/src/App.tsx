import Content from "./component/Content";
import Total from "./component/Total";
import Header from "./component/Header";
import { courseParts } from "./types";

const App = () => {
  const courseName = "Half Stack application development";

  const totalExercises = courseParts.reduce(
    (sum, part) => sum + part.exerciseCount,
    0,
  );

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total totalExercises={totalExercises} />
    </div>
  );
};

export default App;
