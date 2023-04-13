function Avatar({ url }) {
  return (
    <img
      src={url}
      className="w-[45px] lg:w-[45px] rounded-full cursor-pointer"
      alt="Avatar"
    />
  );
}

export default Avatar;
