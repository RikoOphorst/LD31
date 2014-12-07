cbuffer ConstantBuffer : register(b0)
{
  float Time;
  float4x4 World;
  float4x4 View;
  float4x4 Projection;
  float4x4 WorldViewProjection;
  float Alpha;
  float3 Blend;
  float4x4 InvWorld;
}

cbuffer Uniforms : register(b1)
{
  float4 AnimationMetrics;
  float Hit;
  float Selected;
}

struct VOut
{
  float4 position : SV_POSITION;
  float4 colour : COLOUR;
  float3 normal : NORMAL;
  float2 texcoord : TEXCOORD0;
};

VOut VS(float4 position : POSITION, float3 normal : NORMAL, float2 texcoord : TEXCOORD0, float4 colour : COLOUR)
{
  VOut output;
  output.position = mul(position, WorldViewProjection);
  output.normal = normalize(mul(float4(normal, 0), InvWorld).xyz);
  output.texcoord = texcoord;
  output.colour = colour;
  return output;
}

Texture2D textures[2];
SamplerState SampleType;

float4 PS(VOut input) : SV_TARGET
{
  if (Selected == 0)
  {
    return 0;
  }
  
  float x = (input.texcoord.x * AnimationMetrics.z) + AnimationMetrics.x;
  float y = (input.texcoord.y * AnimationMetrics.w) + AnimationMetrics.y;
  float2 texcoords = float2(x,y);
  float4 lum = float4(0.30, 0.59, 0.11, 1);
 

  float s11 = dot(textures[0].Sample(SampleType, texcoords + float2(-1.0f / 1024.0f, -1.0f / 768.0f)), lum); 
  float s12 = dot(textures[0].Sample(SampleType, texcoords + float2(0, -1.0f / 768.0f)), lum);    
  float s13 = dot(textures[0].Sample(SampleType, texcoords + float2(1.0f / 1024.0f, -1.0f / 768.0f)), lum);
 

  float s21 = dot(textures[0].Sample(SampleType, texcoords + float2(-1.0f / 1024.0f, 0)), lum); 

  float s23 = dot(textures[0].Sample(SampleType, texcoords + float2(-1.0f / 1024.0f, 0)), lum); 
 

  float s31 = dot(textures[0].Sample(SampleType, texcoords + float2(-1.0f / 1024.0f, 1.0f / 768.0f)), lum); 
  float s32 = dot(textures[0].Sample(SampleType, texcoords + float2(0, 1.0f / 768.0f)), lum);  
  float s33 = dot(textures[0].Sample(SampleType, texcoords + float2(1.0f / 1024.0f, 1.0f / 768.0f)), lum);
 
  float t1 = s13 + s33 + (2 * s23) - s11 - (2 * s21) - s31;
  float t2 = s31 + (2 * s32) + s33 - s11 - (2 * s12) - s13;
 
  float4 col;
 
  if (((t1 * t1) + (t2 * t2)) > 0.5 && input.texcoord.x > 0.05 && input.texcoord.x < 0.95 && input.texcoord.y > 0.05 && input.texcoord.y < 0.95) {
  col = float4(lerp(0.8,1,input.texcoord.y),0,0,1);
  } else {
    col = float4(0,0,0,0);
  }
 
  return col;
}