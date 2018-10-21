# chef and bored  -- ok tested

# python sol

	t =  int(input())

	while t!=0:
		n = int(input())
		x=0
		for i in range(1,n+1,2):
			l=n-i+1
			x=x+l*l
		print(x)
		t-=1
		

# c solution

#include<stdio.h>
int main()
{
	int t;
	scanf("%d",&t);
	while(t--!=0){
		int n;
		scanf("%d",&n);
		int x=0,i;
		for(i=1;i<=n;i+=2){
			int l;
			l=n-i+1;
			x=x+l*l;
			}
		printf("%d\n",x);
		}

}


# hull sum 

# C solution  -- ok tested

#include <stdlib.h>
#include <stdio.h>
#include <math.h>
 
int main(int argc, char* arg[])
{
    const double PI = 4*atan(1.0);
    int count;
    scanf("%d", &count);
    for ( int i = 0; i < count; i++ ) {
        double f = (i + 0.5) / 50;
        double t = i%3 * 2*PI/3 + f * 0.5;
        int x = sin(t) * 500 * f;
        int y = cos(t) * 500 * f;
        if (i%3 == 0) {
            x += 500 / sqrt(2);
            y += 500 / sqrt(2);
        }
        else if (i%3 == 1) {
            y -= 500;
        }
        else {
            x -= 500;
        }
        printf("%d %d\n", x, y);
    }
    return 0;
}  
 
# java soln -- giving different output
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.util.Arrays;
import java.util.InputMismatchException;
import java.util.Random;

class HULLSUM {
	InputStream is;
	PrintWriter out;
	String INPUT = "";
	
	void solve()
	{
		int n = ni();
		long[][] co = new long[51][];
		Random gen = new Random();
		for(int i = 0;i < 51;i++){
			co[i] = new long[]{
					Math.round(480 * (20-i/3)/20*Math.cos(2*Math.PI/3*(i%3)))+500,
					Math.round(480 * (20-i/3)/20*Math.sin(2*Math.PI/3*(i%3)))+500
					};
			inner:
			while(true){
				for(int j = 0;j < i;j++){
					for(int k = j+1;k < i;k++){
						if(onSameLine(co[j], co[k], co[i])){
							co[i][0] += gen.nextInt(3)-1;
							co[i][1] += gen.nextInt(3)-1;
							continue inner;
						}
					}
				}
				break;
			}
		}
		for(int i = 0;i < n;i++){
			out.println(co[i][0] + " " + co[i][1]);
		}
	}
	
	public static boolean onSameLine(long[] a, long[] b, long[] c)
	{
		return (c[0]-a[0])*(b[1]-a[1])-(c[1]-a[1])*(b[0]-a[0])==0;
	}

	
	void run() throws Exception
	{
		is = INPUT.isEmpty() ? System.in : new ByteArrayInputStream(INPUT.getBytes());
		out = new PrintWriter(System.out);
		
		long s = System.currentTimeMillis();
		solve();
		out.flush();
		if(!INPUT.isEmpty())tr(System.currentTimeMillis()-s+"ms");
	}
	
	public static void main(String[] args) throws Exception { new HULLSUM().run(); }
	
	private byte[] inbuf = new byte[1024];
	public int lenbuf = 0, ptrbuf = 0;
	
	private int readByte()
	{
		if(lenbuf == -1)throw new InputMismatchException();
		if(ptrbuf >= lenbuf){
			ptrbuf = 0;
			try { lenbuf = is.read(inbuf); } catch (IOException e) { throw new InputMismatchException(); }
			if(lenbuf <= 0)return -1;
		}
		return inbuf[ptrbuf++];
	}
	
	private boolean isSpaceChar(int c) { return !(c >= 33 && c <= 126); }
	private int skip() { int b; while((b = readByte()) != -1 && isSpaceChar(b)); return b; }
	
	private double nd() { return Double.parseDouble(ns()); }
	private char nc() { return (char)skip(); }
	
	private String ns()
	{
		int b = skip();
		StringBuilder sb = new StringBuilder();
		while(!(isSpaceChar(b))){ // when nextLine, (isSpaceChar(b) && b != ' ')
			sb.appendCodePoint(b);
			b = readByte();
		}
		return sb.toString();
	}
	
	private char[] ns(int n)
	{
		char[] buf = new char[n];
		int b = skip(), p = 0;
		while(p < n && !(isSpaceChar(b))){
			buf[p++] = (char)b;
			b = readByte();
		}
		return n == p ? buf : Arrays.copyOf(buf, p);
	}
	
	private char[][] nm(int n, int m)
	{
		char[][] map = new char[n][];
		for(int i = 0;i < n;i++)map[i] = ns(m);
		return map;
	}
	
	private int[] na(int n)
	{
		int[] a = new int[n];
		for(int i = 0;i < n;i++)a[i] = ni();
		return a;
	}
	
	private int ni()
	{
		int num = 0, b;
		boolean minus = false;
		while((b = readByte()) != -1 && !((b >= '0' && b <= '9') || b == '-'));
		if(b == '-'){
			minus = true;
			b = readByte();
		}
		
		while(true){
			if(b >= '0' && b <= '9'){
				num = num * 10 + (b - '0');
			}else{
				return minus ? -num : num;
			}
			b = readByte();
		}
	}
	
	private long nl()
	{
		long num = 0;
		int b;
		boolean minus = false;
		while((b = readByte()) != -1 && !((b >= '0' && b <= '9') || b == '-'));
		if(b == '-'){
			minus = true;
			b = readByte();
		}
		
		while(true){
			if(b >= '0' && b <= '9'){
				num = num * 10 + (b - '0');
			}else{
				return minus ? -num : num;
			}
			b = readByte();
		}
	}
	
	private void tr(Object... o) { if(INPUT.length() > 0)System.out.println(Arrays.deepToString(o)); }
}



# minimum deletions

# c soln  -- ok tested

#include<stdio.h>
 	long gcd(long,long);
int main()
    {
     
      	long t,a[1000],i,j,n,f;
      	scanf("%li",&t);
     	 for(i=1;i<=t;i++)
        {
    	       scanf("%li",&n);
    	       for(j=0;j<n;j++)
            scanf("%li",&a[j]);
    	       f=a[0];
    	       for(j=1;j<n;j++)
    	        f=gcd(f,a[j]);
    	       if(f==1)
    	        printf("0\n");
    	       else
    	        printf("-1\n");
        }
     
     
      return 0;
    }
 	   long gcd(long a, long b)
    {
 	       if (a == 0)
            return b;
 	       return gcd(b%a, a);
    }
     
# cpp14 soln 

#include <bits/stdc++.h>

using namespace std;

#define IOS ios_base::sync_with_stdio(0), cin.tie(0), cout.tie(0)
#define endl '\n'
#define ll long long


int main(){
    IOS;
    int t;
    cin>>t;
    while(t--){
        int n;cin>>n;
        int a[n];
        for(int i=0;i<n;++i)cin>>a[i];

        int gcd = a[0];
        for(int i=0;i<n;++i)gcd = __gcd(a[i], gcd);

        if(gcd == 1)cout<<0<<endl;
        else cout<<-1<<endl;
    }

    return 0;
}


# judging delay

# c soln -- ok tested

#include <stdio.h>

int main(void) 
{
	// your code goes here
	int t;
	scanf("%d",&t);
	while(t--)
	{
		int n;
		scanf("%d",&n);
		int s,j,i,count1=0;
		for(i=0;i<n;i++)
		{
			scanf("%d%d",&s,&j);
			if((j-s)>5)
				count1++;
		}
		printf("%d\n",count1);
	}
	return 0;
}


# cpp14 soln -- ok tested

#include<bits/stdc++.h>
#define ll long long
using namespace std ;

int main()
{
	int t;
	cin>>t ;
	while(t--)
	{
		int n; 
		cin>>n ;
		int cnt=0 ;
		for(int i=0 ; i<n ; i++)
		{
			int x,y ;
			cin>>x>>y ;
			if((y-x)>5)
				cnt++ ;
		}
		cout<<cnt<<endl ;
	}
	return 0 ;
}