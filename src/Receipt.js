export default function Receipt({ purchased }) {
  return (
    <div>
      {purchased.map((purchases, idx) => {
        return (
          <div key={`${purchases}-${idx}`}>
            <h2>{`Receipt ${idx + 1}`}</h2>
            <li>{purchases.join(', ')}</li>
          </div>
        );
      })}
    </div>
  );
}
