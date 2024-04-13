function Alert({ message }: { message: string }) {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl relative my-4" role="alert">
      <strong className="font-bold">{message}</strong>
      <span className="block sm:inline"></span>
      <span className="absolute top-0 bottom-0 right-0 px-4 py-3"></span>
    </div>
  );
}

export default Alert;
