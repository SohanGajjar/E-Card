// sohan_gajjar
#include <bits/stdc++.h>
using namespace std;
#define ll long long
#define print(a) cout << a << endl;   
#define AI(arr,n) for(ll i=0; i<n; i++) cin>>arr[i];
#define AO(arr,n) for(ll i=0; i<n; i++) cout<<arr[i];
#define FAST ios_base::sync_with_stdio(false);cin.tie();cout.tie();

int factorial(int n)
{
    return (n==1 || n==0) ? 1 : n* factorial(n-1);
}

bool isPrime(int n)
{
    if (n<2){
        return false;
    }
    for(int i=2; i<=sqrt(n); i++){
        if(n%i == 0){
            return false;
        }
        return true;
    }
    return true;
}

void solve()
{
    int a,b;
    cin >> a >> b;
    int cnt = 0;
    for(int i=1; i<=a; i++)
    {
        int total = factorial(a) + b;
        if(isPrime(total))
        cnt++;
    }
    cout << cnt << endl;
}
int main()
{
FAST
    int t;
    cin >> t;
    while(t--)
    {
        solve();
    }
    return 0;
}