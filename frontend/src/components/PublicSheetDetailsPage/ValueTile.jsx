export default function PublicValueTile({ value }) {
  return (
    <div className='pvt'>
      <p className='pvt-name'>{value.name}</p>
      <p className='pvt-value'>{value.value}</p>
    </div>
  );
}
