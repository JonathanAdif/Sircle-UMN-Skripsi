function Avatar({ url }) {
  return (
    <img
      src={url}
      className="w-[35px] lg:w-[45px] rounded-full cursor-pointer shadow-sm "
      alt="Avatar"
    />
  );
}

export default Avatar;
