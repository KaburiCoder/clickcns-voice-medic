export interface Notice {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  published: boolean;
}

export interface NoticeListItem {
  id: string;
  title: string;
  author: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface NoticeListResponse {
  notices: NoticeListItem[];
  currentPage: number;
  totalPages: number;
  totalCount: number;
}

export interface NoticeListRequest {
  page?: number;
  count?: number;
  searchText?: string;
  showPublishedOnly?: boolean;
}
