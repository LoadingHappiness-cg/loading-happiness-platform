'use client';

export const LogoutButton = () => {
  return (
    <button
      className="btn btn--style-secondary btn--size-small"
      type="button"
      onClick={() => {
        window.location.href = '/admin/logout';
      }}
    >
      Log out
    </button>
  );
};
