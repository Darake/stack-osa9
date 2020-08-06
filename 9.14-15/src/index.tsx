import React from "react";
import ReactDOM from "react-dom";

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartWithDescription extends CoursePartBase {
  description: string;
}

interface CoursePartOne extends CoursePartWithDescription {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartWithDescription {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

interface CoursePartFour extends CoursePartWithDescription {
  name: "My own part";
}

type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Header: React.FC<{ name: string }> = ({ name }) => <h1>{name}</h1>

const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
  let content = `${part.name} ${part.exerciseCount}`

  switch (part.name) {
    case 'My own part':
    case 'Fundamentals':
      content = content + ` ${part.description}`
      break
    case 'Using props to pass data':
      content = content + ` ${part.groupProjectCount}`
      break
    case 'Deeper type usage':
      content = content + ` ${part.description} + ${part.exerciseSubmissionLink}`
      break
    default:
      assertNever(part)
  }

  return <p>{content}</p>
}

const Content: React.FC<{ parts: Array<CoursePart> }> = ({ parts }) => (
  <div>
    {parts.map(part => <Part key={part.name} part={part} />)}
  </div>
)

const Total: React.FC<{ parts: Array<CoursePart> }> = ({ parts }) => (
  <p>
    Number of exercises{" "}
    {parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
  </p>
)

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    },
    {
      name: "My own part",
      exerciseCount: 1337,
      description: "Bestest course"
    }
  ]

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total parts={courseParts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));