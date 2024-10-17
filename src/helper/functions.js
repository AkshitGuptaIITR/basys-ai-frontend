export const capitalizeStringFirst = (headerName) => {
  if (headerName && typeof headerName === "string") {
    return (
      headerName.charAt(0).toUpperCase() + headerName.slice(1).toLowerCase()
    );
  } else {
    return headerName;
  }
};
