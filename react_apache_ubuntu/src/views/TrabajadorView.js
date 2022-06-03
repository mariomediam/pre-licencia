import InfiniteScrollDiv from './ScrollExample'

export default function TrabajadorView() {

  return (
    <div>
      <h1>Scroll infinito</h1>
      <hr />
      <div className="container">
        <div className="row">
          {/* 
          the scroll comes here
          */}
          <InfiniteScrollDiv/>
        </div>
      </div>
    </div>
  );
}
