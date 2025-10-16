export interface IBlog {
  title: string;
  subtitle: string;
  image: string;
  slug: string;
  metaTitle?: string;
  metaDescription?: string;
  tags?: string[];
  content: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}