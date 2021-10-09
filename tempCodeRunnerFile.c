#include<stdio.h>
#include<stdlib.h>
void insertionsort(int arr[],int n)
{
    for (int i=0;i<n;i++)
    {
        int temp= arr[i];
        int j= i;
        while(j>0 && temp< arr[j-1])
        {
            arr[j] = arr[j-1];
            j = j -1;
        }
        arr[j] = temp;
    }
}
int main()
{
    int *bt,*wt,*tat,n;
    float avgwt=0,avgtat=0;
    printf("enter no of process: ");
    scanf("%d",&n);
    bt=(int*)malloc(n*sizeof(int));
    wt=(int*)malloc(n*sizeof(int));
    tat=(int*)malloc(n*sizeof(int));
    printf("\nEnter burst time of each process:");
    for(int i=0;i<n;i++)
    {
        scanf("%d",&bt[i]);
    }
    insertionsort(bt,n);
    wt[0]=0;
    tat[0]=bt[0];
    avgtat=tat[0];
    for(int i=1;i<n;i++)
    {
        wt[i]=wt[i-1]+bt[i-1];
        avgwt+=wt[i];
        tat[i]=wt[i]+bt[i];
        avgtat+=tat[i];
    }
    avgwt=avgwt/n;
    avgtat=avgtat/n;
    printf("| Process name | Burst Time | Waiting Time | Turn around Time |\n");
    for (int i=0;i<n;i++)
    {
        printf("P%d \t\t %d \t\t %d \t\t %d\n",i,bt[i],wt[i],tat[i]);
    }
    printf("\nAverage waiting time is %0.2f\n\n",avgwt);
    printf("Average Turn around Time is %0.2f\n\n",avgtat);

    return 0;
}
