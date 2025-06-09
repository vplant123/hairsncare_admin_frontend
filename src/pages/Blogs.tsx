import React, { useEffect } from 'react';

const Blogs = () => {
  useEffect(() => {
    // Redirect to WordPress admin page
    window.location.href = 'https://blogs.hairsncares.com/wp-admin/edit.php';
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <p>Redirecting to WordPress admin...</p>
    </div>
  );
};

export default Blogs; 