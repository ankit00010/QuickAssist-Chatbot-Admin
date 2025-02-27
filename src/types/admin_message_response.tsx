export type AdminMessageResponse = {
  code: number;
  title: string;
  message: string;
  details: {
    totalUsers: number;
    successCount: number;
    failureCount: number;
  };
};
