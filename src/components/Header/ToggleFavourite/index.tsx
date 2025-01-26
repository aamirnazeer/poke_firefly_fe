export const ToggleFavourite = () => {
  return (
    <div style={{ display: "flex", alignItems: "center", height: "36px" }}>
      <label htmlFor="favourite">show favourites only</label>
      <input type="checkbox" id="favourite" />
    </div>
  );
};
