export interface UlasanUser {
  id: number;
  username: string;
  fullName: string;
}

export interface UlasanPenyewa {
  id: number;
  body: string;
  likes: number;
  user: UlasanUser;
}

export interface DummyJsonCommentsResponse {
  comments: UlasanPenyewa[];
  total: number;
  skip?: number;
  limit?: number;
}
