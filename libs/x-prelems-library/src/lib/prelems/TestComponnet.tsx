// A component with 2 props like title and subtitle in TestComponent.tsx

export const TestComponent = (props: { title: string; subtitle: string }) => {
  return (
    <div>
      <h1 id='primary_heading' className='title'>
        {props.title}
      </h1>
      <h2>{props.subtitle}</h2>
    </div>
  );
};
