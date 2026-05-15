const DataList = ({ users }) => {
  return (
    <div>
      {users.map((user) => (
        <div
          key={user.id}
          style={{
            border: "1px solid gray",
            margin: "10px",
            padding: "10px"
          }}
        >
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
};

export default DataList;