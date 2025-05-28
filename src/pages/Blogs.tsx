
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

const categories = [
  'Hair Procedures',
  'Hair Transplant',
  'Hair Innovations',
  'Hair Products',
  'Hair Loss',
  'Hair Basics'
];

const Blogs = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted');
    setIsDialogOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Blogs</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>Add New Blog</Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Blog</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Blog title" />
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                      id="description" 
                      placeholder="Blog content"
                      className="min-h-[200px]" 
                    />
                  </div>

                  <div>
                    <Label htmlFor="authorName">Author Name</Label>
                    <Input id="authorName" placeholder="Author name" />
                  </div>

                  <div>
                    <Label htmlFor="authorDescription">Author Description</Label>
                    <Textarea id="authorDescription" placeholder="About the author" />
                  </div>

                  <div>
                    <Label htmlFor="authorImage">Author Image</Label>
                    <Input id="authorImage" type="file" accept="image/*" />
                  </div>

                  <div>
                    <Label htmlFor="blogImage">Blog Image</Label>
                    <Input id="blogImage" type="file" accept="image/*" />
                  </div>

                  <div>
                    <Label htmlFor="slug">Slug</Label>
                    <Input id="slug" placeholder="blog-post-url" />
                  </div>

                  <div>
                    <Label htmlFor="canonical">Canonical URL</Label>
                    <Input id="canonical" placeholder="https://example.com/blog/original-post" />
                  </div>

                  <div>
                    <Label htmlFor="seoTitle">SEO Meta Title</Label>
                    <Input id="seoTitle" placeholder="SEO title" />
                  </div>

                  <div>
                    <Label htmlFor="seoDescription">SEO Meta Description</Label>
                    <Textarea id="seoDescription" placeholder="SEO description" />
                  </div>

                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category.toLowerCase()}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="tags">Filter Tags</Label>
                    <Input id="tags" placeholder="Enter tags separated by commas" />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="publish" />
                    <Label htmlFor="publish">Publish</Label>
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Save Blog</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Blog listing table will be implemented here */}
        <div className="text-center py-8 text-muted-foreground">
          No blogs found. Add your first blog post!
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Blogs;
