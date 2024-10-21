export default function SettingTile({ field, value }) {
  return (
    <div className='account-setting-tile'>
      <div>{field}</div>
      <div>{value}</div>
    </div>
  );
}
